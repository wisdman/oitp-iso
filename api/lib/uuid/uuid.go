package uuid

import (
	"github.com/google/uuid"
)

type UID string

func UUID() UID {
	uid, err := uuid.NewUUID()
	if err != nil {
		panic(err)
	}
	return UID(uid.String())
}
