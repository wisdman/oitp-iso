package mathSequence

import (
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

type Parameters struct {
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

var RUNES = [...]string{"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"}

type Item struct {
	Rune string `json:"rune"`
	Data int    `json:"data"`
	Act  string `json:"act"`
}

type Config struct {
	*abstract.Config
	Items []*Item `json:"items"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config: abstract.NewConfig(abstract.MathSequence, abstract.UIMathSequence),

		PlayTimeLimit: params.PlayTimeLimit,
	}
}
