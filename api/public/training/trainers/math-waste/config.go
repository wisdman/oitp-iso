package mathWaste

import (
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

type Parameters struct {
	UUID abstract.UUID `json:"uuid"`

	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Complexity uint16 `json:"complexity"`

	MinQuantity int `json:"minQuantity"`
	MaxQuantity int `json:"maxQuantity"`
}

type Adjustment struct {
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Complexity uint16 `json:"complexity"`

	MinQuantity int `json:"minQuantity"`
	MaxQuantity int `json:"maxQuantity"`
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
		Config: abstract.NewConfig(abstract.MathWaste, abstract.UIMathWaste, params.UUID),

		PlayTimeLimit: params.PlayTimeLimit,
	}
}
