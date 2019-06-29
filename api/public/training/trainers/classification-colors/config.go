package classificationColors

import (
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

type Parameters struct {
	ItemTimeLimit uint16 `json:"itemTimeLimit"`

	MinItems int `json:"minItems"`
	MaxItems int `json:"maxItems"`

	Quantity int `json:"quantity"`
}

type Adjustment struct {
	ItemTimeLimit uint16 `json:"itemTimeLimit"`

	MinItems int `json:"minItems"`
	MaxItems int `json:"maxItems"`
}

type Item struct {
	Color string `json:"color"`
	Data  string `json:"data"`
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
		Config: abstract.NewConfig(abstract.ClassificationColors, abstract.UIClassificationColor),

		ItemTimeLimit: params.ItemTimeLimit,
	}
}
