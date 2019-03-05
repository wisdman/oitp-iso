package main

import (
  "log"
  "net/http"
)

func (api *API) Logout(w http.ResponseWriter, r *http.Request, _ map[string]string) {
  w.Header().Set("Content-Type", "text/plain; charset=utf-8")

  sessionId := r.Header.Get("Authorization")
  if sessionId == "" {
    w.WriteHeader(http.StatusUnauthorized)
    return
  }

  _, err := api.DB.Exec("DELETE FROM sessions WHERE \"ID\" = $1", sessionId)
  if err != nil {
    w.WriteHeader(http.StatusInternalServerError)
    log.Printf("API-LOGIN{DB DELETE} ERROR: %v", err)
    return
  }

  w.WriteHeader(http.StatusOK)
}