package main

import (
	"net"
	"net/http"

	"github.com/jackc/pgx"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

type Login struct {
	Email       string      `json:"email"`
	Password    string      `json:"password"`
	IP          net.IP      `json:"ip"`
	Fingerprint interface{} `json:"fingerprint"`
}

type Session struct {
	Id      string `json:"id"`
	Ts      string `json:"ts"`
	Expires string `json:"expires"`
}

func (api *API) Login(w http.ResponseWriter, r *http.Request) {
	sql := middleware.GetDBTransaction(r)

	var login Login
	err := service.DecodeJSONBody(r, &login)
	if err != nil || login.Email == "" || login.Password == "" {
		service.Error(w, http.StatusUnauthorized)
		return
	}

	login.IP = middleware.GetIP(r)
	if login.IP == nil {
		service.Error(w, http.StatusUnauthorized)
		return
	}

	var session Session
	err = sql.QueryRow(
		`INSERT INTO public.sessions("owner", "ip", "fingerprint")
	     	SELECT
	        u."id" AS "owner",
	        $3 AS "ip",
	        $4 AS "fingerprint"
	      FROM
	        public.users u
	      WHERE
	        u."email" = $1
	        AND
	        u."password" = digest($2, 'sha512')
      RETURNING
        "id",
        to_char("ts", 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS "ts",
        to_char("expires", 'YYYY-MM-DD"T"HH24:MI:SS.US"Z"') AS "expires"`,
		login.Email,
		login.Password,
		login.IP,
		login.Fingerprint,
	).Scan(
		&session.Id,
		&session.Ts,
		&session.Expires,
	)

	if err == pgx.ErrNoRows {
		service.Error(w, http.StatusUnauthorized)
		return
	} else if err != nil {
		service.Fatal(w, err)
		return
	}

	service.ResponseJSON(w, session)
}
