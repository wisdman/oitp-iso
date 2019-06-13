package mathMiddle

import (
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

type Parameters struct {
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Level         int `json:"level"`
	ExamplesCount int `json:"examplesCount"`

	Quantity int `json:"quantity"`
}

type Item struct {
	Data   []int  `json:"data"`
	Answer string `json:"answer"`
}

type Config struct {
	*abstract.Config

	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Items []*Item `json:"items"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config:        abstract.NewConfig(abstract.UIMathMiddle),
		PlayTimeLimit: params.PlayTimeLimit,
		Items:         make([]*Item, params.ExamplesCount+1),
	}
}
