package main

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/jackc/pgx"

	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

type TLogin struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func Login(w http.ResponseWriter, r *http.Request) {
	var login TLogin
	decoder := json.NewDecoder(r.Body)

	err := decoder.Decode(&login)
	if err != nil || login.Email == "" || login.Password == "" {
		service.Error(w, http.StatusUnauthorized)
		return
	}

	sql := db.Conn(r)

	var sessionID string
	var sessionExpires string
	err = sql.QueryRow("SELECT id, expires FROM public.user__login_by_email($1, $2)", login.Email, login.Password).Scan(&sessionID, &sessionExpires)
	if err == pgx.ErrNoRows {
		service.Error(w, http.StatusUnauthorized)
		return
	} else if err != nil {
		service.Fatal(w, err)
		return
	}

	expires, err := time.Parse(time.RFC3339, sessionExpires)
	if err != nil {
		service.Fatal(w, err)
		return
	}

	service.SetSession(w, sessionID, expires)
	w.WriteHeader(http.StatusOK)
}
