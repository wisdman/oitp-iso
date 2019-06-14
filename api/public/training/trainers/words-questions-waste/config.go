package wordsQuestionWaste

import (
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

type Parameters struct {
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Quantity int `json:"quantity"`
}

type Answer struct {
	Data    string `json:"data"`
	Correct bool   `json:"correct"`
}

type Config struct {
	*abstract.Config

	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Items []*Answer `json:"items"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config:        abstract.NewConfig(abstract.UIWordsQuestionWaste),
		PlayTimeLimit: params.PlayTimeLimit,
	}
}
