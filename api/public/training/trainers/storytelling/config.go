package storytelling

import (
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

const MAX_STORY_ID = 70

type Config struct {
	*abstract.Config

	ShowTimeLimit uint16 `json:"showTimeLimit"`

	Image int `json:"image"`
}

func newConfig() *Config {
	return &Config{
		Config:        abstract.NewConfig(abstract.UIRelax),
		ShowTimeLimit: 10,
	}
}
