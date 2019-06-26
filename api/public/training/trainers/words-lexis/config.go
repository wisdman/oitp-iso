package wordsLexis

import (
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

type Parameters struct {
	UUID abstract.UUID `json:"uuid"`

	PlayTimeLimit uint16 `json:"playTimeLimit"`

	MinItems int `json:"minItems"`
	MaxItems int `json:"maxItems"`

	Quantity int `json:"quantity"`
}

type Adjustment struct {
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	MinItems int `json:"minItems"`
	MaxItems int `json:"maxItems"`
}

type Config struct {
	*abstract.Config

	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Items [][]*string `json:"items"`
}

func newConfig(
	id abstract.ITrainer,
	params Parameters,
) *Config {
	return &Config{
		Config: abstract.NewConfig(id, abstract.UIWordsLexis, params.UUID),

		PlayTimeLimit: params.PlayTimeLimit,
	}
}
