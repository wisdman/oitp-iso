package service

import (
	"log"
	"net/http"
)

func Error(w http.ResponseWriter, code int) {
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	http.Error(w, http.StatusText(code), code)
}

func Fatal(w http.ResponseWriter, err interface{}) {
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
	log.Printf("Internal Server Error: %s\n", err)
}
