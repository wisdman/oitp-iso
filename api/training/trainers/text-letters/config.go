package textLetters

import (
	"github.com/wisdman/oitp-isov/api/training/trainers/abstract"
)

type Parameters struct {
	ShowTimeLimit uint16 `json:"showTimeLimit"`
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	MaxLength int `json:"maxLength"`

	Quantity int `json:"quantity"`
}

type Config struct {
	*abstract.Config

	ShowTimeLimit uint16 `json:"showTimeLimit"`
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Data string `json:"data"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config:        abstract.NewConfig(abstract.UITextLetters),
		ShowTimeLimit: params.ShowTimeLimit,
		PlayTimeLimit: params.PlayTimeLimit,
	}
}
