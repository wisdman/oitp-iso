package main

import (
	"net/http"
)

func (api *API) Auth(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
}
