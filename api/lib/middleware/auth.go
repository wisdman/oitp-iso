package middleware

import (
	"errors"
	"net/http"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/lib/service"
)

var xAuthorization = http.CanonicalHeaderKey("X-Authorization")

func Auth(handle http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		sql := GetDBTransaction(r)
		if sql == nil {
			service.Fatal(w, errors.New("Сall Auth outside DB transaction"))
			return
		}

		sessionKey := r.Header.Get(xAuthorization)
		if sessionKey == "" {
			service.Error(w, http.StatusUnauthorized)
			sql.Rollback()
			return
		}

		ip := middleware.GetIP(r)
		if ip == nil {
			service.Error(w, http.StatusUnauthorized)
			return
		}

		_, err := sql.Exec("SELECT public.users__init_session($1, $2)", sessionKey, ip)
		if err != nil {
			service.Error(w, http.StatusUnauthorized)
			sql.Rollback()
			return
		}

		handle(w, r)
	}
}
