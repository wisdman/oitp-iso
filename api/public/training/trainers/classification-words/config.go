package classificationWords

import (
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

type Parameters struct {
	ItemTimeLimit uint16 `json:"itemTimeLimit"`

	MinItems int `json:"minItems"`
	MaxItems int `json:"maxItems"`
	Quantity int `json:"quantity"`
}

type Item struct {
	Word string `json:"word"`
	Data string `json:"data"`
}

type Config struct {
	*abstract.Config

	ItemTimeLimit uint16  `json:"itemTimeLimit"`
	Items         []*Item `json:"items"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config:        abstract.NewConfig(abstract.UIClassificationWords),
		ItemTimeLimit: params.ItemTimeLimit,
	}
}