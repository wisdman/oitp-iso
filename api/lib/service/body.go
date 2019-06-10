package service

import (
	"encoding/json"
	"net/http"
)

func DecodeJSONBody(r *http.Request, obj interface{}) error {
	decoder := json.NewDecoder(r.Body)
	return decoder.Decode(obj)
}
