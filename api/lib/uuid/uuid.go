package uuid

import (
	"github.com/google/uuid"
)

func UUID() string {
	uid, err := uuid.NewUUID()
	if err != nil {
		panic(err)
	}
	return uid.String()
}
