// Named parameters are dynamic path segments.
//  Path: /blog/:category/:post
//
//  Requests:
//   /blog/go/request-routers            match: category="go", post="request-routers"
//   /blog/go/request-routers/           match: category="go", post="request-routers"
//   /blog/go/                           no match
//   /blog/go/request-routers/comments   no match
//

package service

import (
	"context"
	"log"
	"net/http"
	"runtime/debug"
)

type ctxParamsKey int

const ParamsKey ctxParamsKey = 0

// Router is a http.Handler which can be used to dispatch requests to different
// handler functions via configurable routes
type Router struct {
	http.Handler
	trees map[string]*Node
}

// New returns a new initialized Router.
func NewRouter() *Router {
	return &Router{
		trees: make(map[string]*Node),
	}
}

// Handle registers a new request handle with the given path and method.
func (router *Router) Handle(method, path string, handle http.HandlerFunc) {
	if path[0] != '/' {
		log.Fatalf("Path must begin with '/' in path \"%s\"\n", path)
	}

	root := router.trees[method]
	if root == nil {
		root = new(Node)
		router.trees[method] = root
	}

	root.addRoute(path, handle)
}

// ServeHTTP makes the router implement the http.Handler interface.
func (router *Router) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// Catch panic
	defer func() {
		if rvr := recover(); rvr != nil {
			log.Printf("Panic: %+v\n", rvr)
			debug.PrintStack()
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		}
	}()

	path := r.URL.Path

	// Remove path final slashes
	for i := len(path) - 1; i > 1; i-- {
		if path[i] != '/' {
			path = path[:i+1]
			break
		}
	}

	// Handle exist route
	if root := router.trees[r.Method]; root != nil {
		if handle, params := root.getValue(path); handle != nil {
			if params != nil {
				ctx := r.Context()
				ctx = context.WithValue(ctx, ParamsKey, params)
				r = r.WithContext(ctx)
			}
			handle(w, r)
			return
		}
	}

	// Handle 405
	var allow string
	for method := range router.trees {
		if handle, _ := router.trees[method].getValue(path); handle != nil {
			if len(allow) == 0 {
				allow = method
			} else {
				allow += ", " + method
			}
			w.Header().Set("Allow", allow)
			http.Error(w, http.StatusText(http.StatusMethodNotAllowed), http.StatusMethodNotAllowed)
			return
		}
	}

	// Handle 404
	http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
}

func GetParams(r *http.Request) map[string]string {
	if params, ok := r.Context().Value(ParamsKey).(map[string]string); ok {
		return params
	}
	return nil
}

func GetParam(r *http.Request, key string) string {
	if params := GetParams(r); params != nil {
		if value, ok := params[key]; ok {
			return value
		}
	}
	return ""
}
