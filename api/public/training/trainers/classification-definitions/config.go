package classificationDefinitions

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

type Item struct {
	Definition string `json:"definition"`
	Data       string `json:"data"`
}

type Config struct {
	*abstract.Config

	PlayTimeLimit uint16  `json:"playTimeLimit"`
	Items         []*Item `json:"items"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config: abstract.NewConfig(abstract.ClassificationDefinitions, abstract.UIClassificationDefinitions, params.UUID),

		PlayTimeLimit: params.PlayTimeLimit,
	}
}
