package relax

import (
	"github.com/wisdman/oitp-isov/api/training/trainers/abstract"
)

const MAX_RELAX_ID = 45

type Config struct {
	*abstract.Config

	TimeLimit uint16 `json:"timeLimit"`

	Image int    `json:"image"`
	Text  string `json:"text"`
}

func newConfig() *Config {
	return &Config{
		Config:    abstract.NewConfig(abstract.UIRelax),
		TimeLimit: 10,
	}
}
