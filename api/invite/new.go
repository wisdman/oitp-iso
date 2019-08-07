package main

import (
	"net/http"

	"github.com/jackc/pgx"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

type Invite struct {
	Email string `json:"email"`
}

type TemplateData struct {
	Href string
}

func (api *API) New(w http.ResponseWriter, r *http.Request) {
	var invite Invite
	err := service.DecodeJSONBody(r, &invite)
	if err != nil || invite.Email == "" {
		service.Error(w, http.StatusBadRequest)
		return
	}

	sql := middleware.GetDBTransaction(r)

	var alreadyExists bool
	err = sql.QueryRow(
		`SELECT TRUE FROM public.users WHERE "email" = $1`,
		invite.Email,
	).Scan(&alreadyExists)

	if err != nil && err != pgx.ErrNoRows {
		service.Fatal(w, err)
		return
	}

	if alreadyExists {
		service.Error(w, http.StatusConflict)
		return
	}

	var id string
	err = sql.QueryRow(
		`SELECT public.invites__new($1)`,
		invite.Email,
	).Scan(&id)

	if err != nil {
		service.Fatal(w, err)
		return
	}

	smtp := middleware.GetSMTP(r)

	if err = smtp.Send(invite.Email, "Международная школа Васильевой Online - Регистрация", TemplateData{
		Href: "https://app.vllschool.com/invite/" + id,
	}); err != nil {
		service.Fatal(w, err)
		return
	}

	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.WriteHeader(http.StatusOK)
}
