package main

import (
  "encoding/json"
  "fmt"
  "log"
  "net/http"

  "github.com/jackc/pgx"
)

type Login struct {
  Email string
  Password string
}

func (api *API) Login(w http.ResponseWriter, r *http.Request, _ map[string]string) {
  w.Header().Set("Content-Type", "text/plain; charset=utf-8")

  var login Login
  decoder := json.NewDecoder(r.Body)
  err := decoder.Decode(&login)
  if err != nil || login.Email == "" || login.Password == "" {
    w.WriteHeader(http.StatusUnauthorized)
    return
  }

  var userId string
  err = api.DB.QueryRow("SELECT \"ID\" FROM users WHERE \"Enable\" AND \"Email\" = $1 AND \"Password\" = encode(digest($2, 'sha512'), 'hex')", login.Email, login.Password).Scan(&userId)
  if err == pgx.ErrNoRows {
    w.WriteHeader(http.StatusUnauthorized)
    return
  } else if err != nil {
    w.WriteHeader(http.StatusInternalServerError)
    log.Printf("API-LOGIN{DB SELECT} ERROR: %v", err)
    return
  }

  var sessionId string
  err = api.DB.QueryRow("INSERT INTO sessions (\"Owner\") VALUES ($1) RETURNING \"ID\"", userId).Scan(&sessionId)
  if err != nil {
    w.WriteHeader(http.StatusInternalServerError)
    log.Printf("API-LOGIN{DB INSERT} ERROR: %v", err)
    return
  }

  w.Header().Set("Content-Type", "application/json")
  w.WriteHeader(http.StatusOK)
  fmt.Fprintf(w, `{"session": "%s"}`, sessionId)
}