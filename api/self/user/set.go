package main

import (
	"net/http"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

type User struct {
	Name    *string `json:"name"`
	Surname *string `json:"surname"`

	Gender   *string `json:"gender"`
	Country  *string `json:"country"`
	Location *string `json:"location"`

	Birthday *string `json:"birthday"`
}

func (api *API) SetUserData(w http.ResponseWriter, r *http.Request) {
	var user User
	err := service.DecodeJSONBody(r, &user)
	if err != nil {
		service.Error(w, http.StatusBadRequest)
		return
	}

	sql := middleware.GetDBTransaction(r)

	if _, err := sql.Exec(
		`SELECT self.user__update($1)`,
		user,
	); err != nil {
		service.Fatal(w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
}
