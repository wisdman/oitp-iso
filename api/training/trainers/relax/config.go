package relax

import (
	"github.com/wisdman/oitp-isov/api/training/trainers"
)

const relaxTimeLimit = 10
const relaxImagesCount = 10

type Config struct {
	*trainers.Config

	Image uint8  `json:"image"`
	Text  string `json:"text"`
}

func newConfig() *Config {
	return &Config{
		Config: trainers.NewConfig(trainers.UIRelax, relaxTimeLimit),
	}
}
