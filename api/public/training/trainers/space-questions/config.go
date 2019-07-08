package spaceQuestions

import (
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

type Parameters struct {
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	MinItems int `json:"minItems"`
	MaxItems int `json:"maxItems"`

	MinQuantity int `json:"minQuantity"`
	MaxQuantity int `json:"maxQuantity"`
}

type Adjustment struct {
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	MinItems int `json:"minItems"`
	MaxItems int `json:"maxItems"`

	MinQuantity int `json:"minQuantity"`
	MaxQuantity int `json:"maxQuantity"`
}

type Answer struct {
	Data    string `json:"data"`
	Correct bool   `json:"correct"`
}

type Config struct {
	*abstract.Config
	Items []*Answer `json:"items"`
}

func newConfig(
	id abstract.ITrainer,
	ui abstract.IUITrainer,
	params Parameters,
) *Config {
	return &Config{
		Config: abstract.NewConfig(id, ui),

		PlayTimeLimit: params.PlayTimeLimit,
	}
}
