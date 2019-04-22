package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/jackc/pgx"

	"github.com/wisdman/oitp-isov/api/lib/service"
)

type ILogin struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (api *API) Login(w http.ResponseWriter, r *http.Request) {
	var login ILogin
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&login)
	if err != nil || login.Email == "" || login.Password == "" {
		service.Error(w, http.StatusUnauthorized)
		return
	}

	sql, err := api.db.Acquire()
	if err != nil {
		service.Fatal(w, err)
		return
	}

	var sessionID string
	var sessionExpires string
	err = sql.QueryRow(
		"SELECT id, expires FROM public.user__login_by_email($1, $2)",
		login.Email,
		login.Password,
	).Scan(&sessionID, &sessionExpires)
	if err == pgx.ErrNoRows {
		log.Println(err)
		service.Error(w, http.StatusUnauthorized)
		sql.Rollback()
		return
	} else if err != nil {
		service.Fatal(w, err)
		sql.Rollback()
		return
	}

	expires, err := time.Parse(time.RFC3339, sessionExpires)
	if err != nil {
		service.Fatal(w, err)
		sql.Rollback()
		return
	}

	if err = sql.Commit(); err != nil {
		service.Fatal(w, err)
		return
	}

	setSession(w, sessionID, expires)
	w.WriteHeader(http.StatusOK)
}
