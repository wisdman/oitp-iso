package tablePipe

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
)

type Parameters struct {
	Size       uint `json:"size"`
	ItemsCount uint `json:"itemsCount"`
	TimeLimit  uint `json:"timeLimit"`
}
