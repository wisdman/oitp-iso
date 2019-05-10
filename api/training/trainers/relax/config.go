package relax

import (
	"github.com/wisdman/oitp-isov/api/training/trainers"
)

const ImagesCount = 10

type Config struct {
	*trainers.Config

	TimeLimit uint16 `json:"timeLimit"`

	Image uint8  `json:"image"`
	Text  string `json:"text"`
}

func newConfig() *Config {
	return &Config{
		Config:    trainers.NewConfig(trainers.UIRelax),
		TimeLimit: 10,
	}
}
