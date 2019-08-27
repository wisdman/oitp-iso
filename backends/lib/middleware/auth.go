package middleware

import (
	"errors"
	"net/http"

	"github.com/wisdman/oitp-isov/backends/lib/service"
)

var xAuthorization = http.CanonicalHeaderKey("X-Authorization")

func Auth(handle http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		sessionKey := r.Header.Get(xAuthorization)
		if sessionKey == "" {
			service.Error(w, http.StatusUnauthorized)
			return
		}

		ip := GetIP(r)
		if ip == nil {
			service.Fatal(w, errors.New("Incorrect IP address"))
			return
		}

		sql := GetDBTransaction(r)
		if sql == nil {
			service.Fatal(w, errors.New("Сall Auth outside DB transaction"))
			return
		}

		var result bool
		if err := sql.QueryRow("SELECT self.init_session($1, $2)", sessionKey, ip).Scan(&result); err != nil {
			service.Fatal(w, err)
			return
		}

		if !result {
			service.Error(w, http.StatusUnauthorized)
			return
		}

		handle(w, r)
	}
}
