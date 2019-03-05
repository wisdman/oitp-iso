package main

import (
  "fmt"
  "log"
  "net/http"

  "github.com/jackc/pgx"
)

func (api *API) Check(w http.ResponseWriter, r *http.Request, _ map[string]string) {
  w.Header().Set("Content-Type", "text/plain; charset=utf-8")

  sessionId := r.Header.Get("Authorization")
  if sessionId == "" {
    w.WriteHeader(http.StatusUnauthorized)
    return
  }

  var userId string
  err := api.DB.QueryRow("SELECT \"Owner\" FROM sessions WHERE \"ID\" = $1", sessionId).Scan(&userId)
  if err == pgx.ErrNoRows {
    w.WriteHeader(http.StatusUnauthorized)
    return
  } else if err != nil {
    w.WriteHeader(http.StatusInternalServerError)
    log.Printf("API-CHECK{DB SELECT} ERROR: %v", err)
    return
  }

  w.Header().Set("Content-Type", "application/json")
  w.WriteHeader(http.StatusOK)
  fmt.Fprintf(w, `{"ID": "%s"}`, userId)
}