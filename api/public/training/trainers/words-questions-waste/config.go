package wordsQuestionWaste

import (
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

type Parameters struct {
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
	Items []*Answer `json:"items"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config: abstract.NewConfig(abstract.WordsQuestionsWaste, abstract.UIWordsQuestionWaste),

		PlayTimeLimit: params.PlayTimeLimit,
	}
}
