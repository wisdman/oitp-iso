package relax

import (
	"github.com/wisdman/oitp-isov/api/training/trainers/abstract"
)

const MAX_RELAX_ID = 45

type Config struct {
	*abstract.Config

	ShowTimeLimit uint16 `json:"showTimeLimit"`

	Image int    `json:"image"`
	Text  string `json:"text"`
}

func newConfig() *Config {
	return &Config{
		Config: abstract.NewConfig(abstract.UIRelax),

		ShowTimeLimit: 10,
	}
}
