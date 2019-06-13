package mathWaste

import (
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

type Parameters struct {
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Level    int `json:"level"`
	Quantity int `json:"quantity"`
}

type Config struct {
	*abstract.Config

	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Items []int `json:"items"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config:        abstract.NewConfig(abstract.UIMathWaste),
		PlayTimeLimit: params.PlayTimeLimit,
	}
}