package classificationDefinitions

import (
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

type Parameters struct {
	TimeLimit uint16 `json:"timeLimit"`

	MinItems int `json:"minItems"`
	MaxItems int `json:"maxItems"`
}

type Item struct {
	Definition string `json:"definition"`
	Data       string `json:"data"`
}

type Config struct {
	*abstract.Config

	TimeLimit uint16  `json:"timeLimit"`
	Items     []*Item `json:"items"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config:    abstract.NewConfig(abstract.UIClassificationDefinitions),
		TimeLimit: params.TimeLimit,
	}
}
