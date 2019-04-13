package service

import (
	"context"
	"net/http"
	"time"
)

const CookieKey = "session"

type ctxSession int

const ctxSessionKey ctxSession = 0

func SessionMiddleware(next http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {

		cookie, err := r.Cookie(CookieKey)
		if err == http.ErrNoCookie {
			Error(w, http.StatusUnauthorized)
			return
		} else if err != nil {
			Fatal(w, err)
			return
		}

		ctx := r.Context()
		ctx = context.WithValue(ctx, ctxSessionKey, cookie.Value)
		next.ServeHTTP(w, r.WithContext(ctx))
	}
	return http.HandlerFunc(fn)
}

func GetSession(r *http.Request) string {
	if sessionID, ok := r.Context().Value(ctxSessionKey).(string); ok {
		return sessionID
	}
	return ""
}

func SetSession(w http.ResponseWriter, sessionID string, expires time.Time) {
	cookie := &http.Cookie{
		Expires:  expires,
		HttpOnly: true,
		Name:     CookieKey,
		Path:     "/",
		SameSite: http.SameSiteStrictMode,
		Value:    sessionID,
	}

	http.SetCookie(w, cookie)
	w.WriteHeader(http.StatusOK)
}
