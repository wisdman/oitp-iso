package service

import (
  "net/http"
  "regexp"
  "strings"
)

type Router struct {
  routes []*Route
}

var slashesRx = regexp.MustCompile("/+")

func (router *Router) Handle(method string, path string, handler Handler) {
  method = strings.ToUpper(method)
  path = strings.Trim(path, "/")

  ids := []string{"*"}
  pathParts := []string{}

  for _, v := range slashesRx.Split(path, -1) {
    part := regexp.QuoteMeta(strings.TrimSpace(v))

    if (part == "") {
      continue
    }

    if (part[0] == ':') {
      ids = append(ids, strings.TrimLeft(part, ":"))
      pathParts = append(pathParts, "([\\w-]+)")
      continue
    }

    pathParts = append(pathParts, part)
  }

  var pattern string
  if (len(pathParts) > 0) {
    pattern = "/*" + strings.Join(pathParts, "/+") + "/*"
  } else {
    pattern = "/*"
  }

  rx := regexp.MustCompile(pattern)

  router.routes = append(router.routes, &Route{method, rx, ids, handler})
}

func (router *Router) DELETE(path string, handle Handler) {
  router.Handle("DELETE", path, handle)
}

func (router *Router) GET(path string, handle Handler) {
  router.Handle("GET", path, handle)
}

func (router *Router) HEAD(path string, handle Handler) {
  router.Handle("HEAD", path, handle)
}

func (router *Router) OPTIONS(path string, handle Handler) {
  router.Handle("OPTIONS", path, handle)
}

func (router *Router) PATCH(path string, handle Handler) {
  router.Handle("PATCH", path, handle)
}

func (router *Router) POST(path string, handle Handler) {
  router.Handle("POST", path, handle)
}

func (router *Router) PUT(path string, handle Handler) {
  router.Handle("PUT", path, handle)
}

func (router *Router) ServeHTTP(w http.ResponseWriter, r *http.Request) {
  for _, route := range router.routes {
    if route.Exec(w, r) {
      return
    }
  }

  http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
}