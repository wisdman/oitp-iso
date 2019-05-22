package wordsColumns

import (
	"github.com/wisdman/oitp-isov/api/training/trainers/abstract"
)

type Parameters struct {
	ShowTimeLimit uint16 `json:"showTimeLimit"`
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	ItemsCount uint16 `json:"itemsCount"`

	Quantity int `json:"quantity"`
}

type Config struct {
	*abstract.Config

	ShowTimeLimit uint16 `json:"showTimeLimit"`
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Items [][]*string `json:"items"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config:        abstract.NewConfig(abstract.UIWordsColumns),
		ShowTimeLimit: params.ShowTimeLimit,
		PlayTimeLimit: params.PlayTimeLimit,
	}
}
