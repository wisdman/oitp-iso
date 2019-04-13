package service

import (
	"encoding/json"
	"net/http"
)

func ResponseText(w http.ResponseWriter, data string) {
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.Write([]byte(data))
}

func ResponseHTML(w http.ResponseWriter, data string) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Write([]byte(data))
}

func ResponseJSON(w http.ResponseWriter, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(data)
}
