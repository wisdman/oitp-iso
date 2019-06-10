package main

import (
	"net/http"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

func (api *API) GetUser(w http.ResponseWriter, r *http.Request) {
	sql := middleware.GetDBTransaction(r)

	var user User
	err := sql.QueryRow(`
		SELECT
			u."id",

			u."email",
			u."emailIsValid",

			u."phone",
    	u."phoneIsValid",

    	u."name",
	    u."surname",
	    u."avatar"

		FROM public.self AS u
		LIMIT 1`,
	).Scan(
		&user.Id,

		&user.Email,
		&user.EmailIsValid,

		&user.Phone,
		&user.PhoneIsValid,

		&user.Name,
		&user.Surname,
		&user.Avatar,
	)
	if err != nil {
		service.Fatal(w, err)
		return
	}

	service.ResponseJSON(w, user)
}
