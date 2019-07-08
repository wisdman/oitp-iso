package relax

import (
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

const MAX_RELAX_ID = 45
const SHOW_TIME_LIMIT = 10

type Config struct {
	*abstract.Config

	Image int    `json:"image"`
	Text  string `json:"text"`
}

func newConfig() *Config {
	return &Config{
		Config: abstract.NewConfig(abstract.Relax, abstract.UIRelax),

		ShowTimeLimit: SHOW_TIME_LIMIT,
	}
}
