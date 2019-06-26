package wordsQuestionWaste

import (
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

type Parameters struct {
	UUID abstract.UUID `json:"uuid"`

	PlayTimeLimit uint16 `json:"playTimeLimit"`

	MinQuantity int `json:"minQuantity"`
	MaxQuantity int `json:"maxQuantity"`
}

type Adjustment struct {
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	MinQuantity int `json:"minQuantity"`
	MaxQuantity int `json:"maxQuantity"`
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
		Config: abstract.NewConfig(abstract.WordsQuestionsWaste, abstract.UIWordsQuestionWaste, params.UUID),

		PlayTimeLimit: params.PlayTimeLimit,
	}
}
