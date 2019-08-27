package service

import (
	"encoding/json"
	"io"
	"net/http"
)

func ResponseJSON(w http.ResponseWriter, obj interface{}) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(obj)
}

func ResponseText(w http.ResponseWriter, text *string) {
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	io.WriteString(w, *text)
}
