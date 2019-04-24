package trainers

import (
	"math/rand"
	"time"

	"github.com/wisdman/oitp-isov/api/lib/uuid"
)

type RelaxConfig struct {
	ID        string `json:"id"`
	UID       string `json:"uid"`
	TimeLimit int    `json:"timeLimit"`

	Image int `json:"image"`
}

func newRelaxConfig(img int) *RelaxConfig {
	return &RelaxConfig{
		ID:        "relax",
		UID:       uuid.UUID(),
		TimeLimit: 10,
		Image:     img,
	}
}

func Relax() (
	configs []interface{},
	err error,
) {
	rand.Seed(time.Now().UnixNano())
	img := rand.Intn(41)
	config := newRelaxConfig(img)
	configs = append(configs, config)
	return
}
