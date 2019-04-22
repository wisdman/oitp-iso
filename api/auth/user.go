package main

import (
	"net/http"

	"github.com/jackc/pgx"

	"github.com/wisdman/oitp-isov/api/lib/db"
)

func getUser(sql *db.Transaction, r *http.Request) (string, []string, error) {

	sessionID, err := getSession(r)
	if err != nil {
		return "", nil, err
	}

	if sessionID == "" {
		return "", []string{}, nil
	}

	var userID string
	var userRoles []string
	err = sql.QueryRow(
		`SELECT "id", "roles" FROM public.user__by_session($1)`,
		sessionID,
	).Scan(&userID, &userRoles)
	if err == pgx.ErrNoRows {
		return "", []string{}, nil
	} else if err != nil {
		return "", nil, err
	}

	return userID, userRoles, nil
}
