package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/jackc/pgx"
	"github.com/jackc/pgx/pgtype"
)

type Logger struct{}

func (l *Logger) Log(level pgx.LogLevel, msg string, data map[string]interface{}) {
	logArgs := make([]interface{}, 0, 2+len(data))
	logArgs = append(logArgs, level, msg)
	for k, v := range data {
		logArgs = append(logArgs, fmt.Sprintf("%s=%v", k, v))
	}
	log.Print(logArgs...)
}

type ctxDB int

const ctxDBKey ctxDB = 0

type Pattern struct {
	Id      *string  `json:"id",      sql:"id"`
	Enabled *bool    `json:"enabled", sql:"enabled"`
	Deleted *bool    `json:"deleted", sql:"deleted"`
	Data    []uint16 `json:"data",    sql:"data"`
}

func main() {
	config, err := pgx.ParseEnvLibpq()
	if err != nil {
		log.Fatalln(os.Stderr, "Unable to parse environment:", err)
	}

	db, err := pgx.NewConnPool(pgx.ConnPoolConfig{ConnConfig: config})
	if err != nil {
		log.Fatalln(os.Stderr, "Unable to connect to database:", err)
	}

	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(60 * time.Second))
	r.Use(dbMiddleware(db))

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		db := r.Context().Value(ctxDBKey).(*pgx.ConnPool)

		rows, err := db.Query(`SELECT "id", "enabled", "deleted", "data" FROM trainers_data_patterns`)
		if err != nil {
			w.Header().Set("Content-Type", "text/plain; charset=utf-8")
			w.WriteHeader(http.StatusInternalServerError)
			log.Println(os.Stderr, "Database error: ", err)
			return
		}
		defer rows.Close()

		var patterns []Pattern
		for rows.Next() {
			var pattern Pattern
			var data pgtype.Int2Array

			err := rows.Scan(&pattern.Id, &pattern.Enabled, &pattern.Deleted, &data)
			if err != nil {
				w.Header().Set("Content-Type", "text/plain; charset=utf-8")
				w.WriteHeader(http.StatusInternalServerError)
				log.Println(os.Stderr, "Database error: ", err)
				return
			}

			data.AssignTo(&pattern.Data)
			patterns = append(patterns, pattern)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(patterns)
	})

	r.Get("/{id}", func(w http.ResponseWriter, r *http.Request) {
		db := r.Context().Value(ctxDBKey).(*pgx.ConnPool)
		id := chi.URLParam(r, "id")

		var pattern Pattern
		var data pgtype.Int2Array

		err := db.QueryRow(
			`SELECT "id", "enabled", "deleted", "data" FROM trainers_data_patterns WHERE id=$1`,
			id,
		).Scan(&pattern.Id, &pattern.Enabled, &pattern.Deleted, &data)

		if err == pgx.ErrNoRows {
			w.Header().Set("Content-Type", "text/plain; charset=utf-8")
			w.WriteHeader(http.StatusNotFound)
			return
		} else if err != nil {
			w.Header().Set("Content-Type", "text/plain; charset=utf-8")
			w.WriteHeader(http.StatusInternalServerError)
			log.Println(os.Stderr, "Database error: ", err)
			return
		}

		data.AssignTo(&pattern.Data)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(pattern)
	})

	r.Post("/", func(w http.ResponseWriter, r *http.Request) {
		db := r.Context().Value(ctxDBKey).(*pgx.ConnPool)

		var newData []uint16
		err := json.NewDecoder(r.Body).Decode(&newData)
		if err != nil {
			w.Header().Set("Content-Type", "text/plain; charset=utf-8")
			w.WriteHeader(http.StatusBadRequest)
			log.Println(os.Stderr, "Bad Request: ", err)
			return
		}

		var pattern Pattern
		var data pgtype.Int2Array

		err = db.QueryRow(
			`INSERT INTO trainers_data_patterns (data) VALUES ($1) RETURNING "id", "enabled", "deleted", "data"`,
			newData,
		).Scan(&pattern.Id, &pattern.Enabled, &pattern.Deleted, &data)

		if err != nil {
			w.Header().Set("Content-Type", "text/plain; charset=utf-8")
			w.WriteHeader(http.StatusInternalServerError)
			log.Println(os.Stderr, "Database error: ", err)
			return
		}

		data.AssignTo(&pattern.Data)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(pattern)
	})

	r.Post("/{id}", func(w http.ResponseWriter, r *http.Request) {
		db := r.Context().Value(ctxDBKey).(*pgx.ConnPool)
		id := chi.URLParam(r, "id")

		var newData []uint16
		err := json.NewDecoder(r.Body).Decode(&newData)
		if err != nil {
			w.Header().Set("Content-Type", "text/plain; charset=utf-8")
			w.WriteHeader(http.StatusBadRequest)
			log.Println(os.Stderr, "Bad Request: ", err)
			return
		}

		var pattern Pattern
		var data pgtype.Int2Array

		err = db.QueryRow(
			`UPDATE trainers_data_patterns SET "data" = $1 WHERE id=$2 RETURNING "id", "enabled", "deleted", "data"`,
			newData, id,
		).Scan(&pattern.Id, &pattern.Enabled, &pattern.Deleted, &data)

		if err == pgx.ErrNoRows {
			w.Header().Set("Content-Type", "text/plain; charset=utf-8")
			w.WriteHeader(http.StatusNotFound)
			return
		} else if err != nil {
			w.Header().Set("Content-Type", "text/plain; charset=utf-8")
			w.WriteHeader(http.StatusInternalServerError)
			log.Println(os.Stderr, "Database error: ", err)
			return
		}

		data.AssignTo(&pattern.Data)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(pattern)
	})

	http.ListenAndServe(":80", r)
}

func dbMiddleware(db *pgx.ConnPool) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx := r.Context()
			ctx = context.WithValue(ctx, ctxDBKey, db)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}
