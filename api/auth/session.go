package main

import (
	"net/http"
	"time"
)

const CookieKey = "session_id"

func getSession(r *http.Request) (string, error) {
	cookie, err := r.Cookie(CookieKey)
	if err == http.ErrNoCookie {
		return "", nil
	} else if err != nil {
		return "", err
	}

	return cookie.Value, nil
}

func setSession(w http.ResponseWriter, sessionID string, expires time.Time) {
	cookie := &http.Cookie{
		Expires:  expires,
		HttpOnly: true,
		Name:     CookieKey,
		Path:     "/",
		SameSite: http.SameSiteStrictMode,
		Value:    sessionID,
	}

	http.SetCookie(w, cookie)
}
