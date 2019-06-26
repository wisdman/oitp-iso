package mathMiddle

import (
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

type Parameters struct {
	UUID abstract.UUID `json:"uuid"`

	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Complexity    uint16 `json:"complexity"`
	ExamplesCount int    `json:"examplesCount"`

	MinQuantity int `json:"minQuantity"`
	MaxQuantity int `json:"maxQuantity"`
}

type Adjustment struct {
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Complexity uint16 `json:"complexity"`

	MinQuantity int `json:"minQuantity"`
	MaxQuantity int `json:"maxQuantity"`
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
		Config: abstract.NewConfig(abstract.MathMiddle, abstract.UIMathMiddle, params.UUID),

		PlayTimeLimit: params.PlayTimeLimit,

		Items: make([]*Item, params.ExamplesCount+1),
	}
}
