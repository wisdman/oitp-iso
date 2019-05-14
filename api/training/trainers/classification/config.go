package classification

import (
	"github.com/wisdman/oitp-isov/api/training/trainers/abstract"
)

type Parameters struct {
	ItemTimeLimit uint16 `json:"itemTimeLimit"`

	MaxItems int `json:"maxItems"`
	MinItems int `json:"minItems"`

	Quantity int `json:"quantity"`
}

type IType string

const (
	TypeColors IType = "colors"
	TypeTexts  IType = "texts"
	TypeImages IType = "images"
)

type Item struct {
	Group string `json:"group"`
	Data  string `json:"data"`
}

type Config struct {
	*abstract.Config

	Type IType `json:"type"`

	ItemTimeLimit uint16  `json:"itemTimeLimit"`
	Items         []*Item `json:"items"`
}

func newConfig(
	params Parameters,
	gameType IType,
) *Config {
	return &Config{
		Config:        abstract.NewConfig(abstract.UIClassification),
		Type:          gameType,
		ItemTimeLimit: params.ItemTimeLimit,
	}
}
