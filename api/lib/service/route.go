package service

import (
  "net/http"
  "regexp"
)

type Handler func(http.ResponseWriter, *http.Request, map[string]string)

type Route struct {
  method string
  rx *regexp.Regexp
  ids []string
  handler Handler
}

func (route *Route) Exec(w http.ResponseWriter, r *http.Request) bool {

  if (route.method != r.Method) {
    return false
  }

  result := route.rx.FindStringSubmatch(r.URL.Path)

  if len(result) == 0 {
    return false
  }

  data := make(map[string]string)

  for i, v := range result {
    data[ route.ids[i] ] = v
  }

  route.handler(w, r, data)
  return true
}