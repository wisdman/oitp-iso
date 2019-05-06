package trainers

import (
	"math/rand"
	"time"

	"github.com/wisdman/oitp-isov/api/lib/uuid"
)

type ResultConfig struct {
	ID        string `json:"id"`
	UID       string `json:"uid"`
	TimeLimit int    `json:"timeLimit"`

	Result int `json:"result"`
}

func newResultConfig(result int) *ResultConfig {
	return &ResultConfig{
		ID:        "result",
		UID:       uuid.UUID(),
		TimeLimit: 0,

		Result: result,
	}
}

func Result() (
	configs []interface{},
	err error,
) {
	rand.Seed(time.Now().UnixNano())
	result := 70 + rand.Intn(17)
	config := newResultConfig(result)
	configs = append(configs, config)
	return
}
