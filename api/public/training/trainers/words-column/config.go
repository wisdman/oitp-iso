package wordsColumn

import (
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

type Parameters struct {
	ShowTimeLimit uint16 `json:"showTimeLimit"`
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	MinItems int `json:"minItems"`
	MaxItems int `json:"maxItems"`

	MinQuantity int `json:"minQuantity"`
	MaxQuantity int `json:"maxQuantity"`
}

type Adjustment struct {
	ShowTimeLimit uint16 `json:"showTimeLimit"`

	MinItems int `json:"minItems"`
	MaxItems int `json:"maxItems"`

	MinQuantity int `json:"minQuantity"`
	MaxQuantity int `json:"maxQuantity"`
}

type Config struct {
	*abstract.Config
	Items []string `json:"items"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config: abstract.NewConfig(abstract.WordsColumn, abstract.UIWordsColumn),

		ShowTimeLimit: params.ShowTimeLimit,
		PlayTimeLimit: params.PlayTimeLimit,
	}
}
