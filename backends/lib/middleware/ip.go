package middleware

import (
	"context"
	"errors"
	"net"
	"net/http"
	"strings"

	"github.com/wisdman/oitp-isov/backends/lib/service"
)

type ctxIPKeyType int

const IPKey ctxIPKeyType = 0

var xHeaders = [...]string{
	http.CanonicalHeaderKey("X-Forwarded-For"),
	http.CanonicalHeaderKey("X-Real-IP"),
}

func getHeader(r *http.Request, headerKey string) string {
	if header := r.Header.Get(headerKey); header != "" {
		i := strings.Index(header, ",")
		if i == -1 {
			return header
		}
		return header[:i]
	}
	return ""
}

func getHeaderIP(r *http.Request, headerKey string) (net.IP, error) {
	if header := getHeader(r, headerKey); header != "" {
		userIP := net.ParseIP(header)
		if userIP == nil {
			return nil, errors.New("Incorrect " + headerKey + " header")
		}
		return userIP, nil
	}
	return nil, nil
}

func getRemoteAddr(r *http.Request) (net.IP, error) {
	ip, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		return nil, err
	}

	userIP := net.ParseIP(ip)
	if userIP == nil {
		return nil, err
	}

	return userIP, nil
}

func getIP(r *http.Request) (net.IP, error) {
	for _, headerKey := range xHeaders {
		ip, err := getHeaderIP(r, headerKey)
		if err != nil {
			return nil, err
		}
		if ip != nil {
			return ip, nil
		}
	}

	return getRemoteAddr(r)
}

func IP(handle http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		ip, err := getIP(r)
		if err != nil {
			service.Fatal(w, err)
			return
		}

		ctx := r.Context()
		ctx = context.WithValue(ctx, IPKey, ip)
		r = r.WithContext(ctx)

		handle(w, r)
	}
}

func GetIP(r *http.Request) net.IP {
	if ip, ok := r.Context().Value(IPKey).(net.IP); ok {
		return ip
	}
	return nil
}
