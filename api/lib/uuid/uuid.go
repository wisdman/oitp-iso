package uuid

import (
	"github.com/google/uuid"
)

type UUID string

func New() UUID {
	uid := uuid.New()
	return UUID(uid.String())
}
