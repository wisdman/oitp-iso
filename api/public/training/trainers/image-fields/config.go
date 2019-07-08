package imageFields

import (
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

type Parameters struct {
	ShowTimeLimit uint16 `json:"showTimeLimit"`
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	MinItems int `json:"minItems"`
	MaxItems int `json:"maxItems"`

	MinQuantity int `json:"minQuantity"`
	MaxQuantity int `json:"maxQuantity"`

	AnswersCount int `json:"answersCount"`
}

type Adjustment struct {
	ShowTimeLimit uint16 `json:"showTimeLimit"`

	MinItems int `json:"minItems"`
	MaxItems int `json:"maxItems"`

	MinQuantity int `json:"minQuantity"`
	MaxQuantity int `json:"maxQuantity"`

	AnswersCount int `json:"answersCount"`
}

type Config struct {
	*abstract.Config

	Items []int `json:"items"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config: abstract.NewConfig(abstract.ImageFields, abstract.UIImageField),

		ShowTimeLimit: params.ShowTimeLimit,
	}
}

type Answer struct {
	Icon    int  `json:"icon"`
	Correct bool `json:"correct"`
}

type QuestionConfig struct {
	*abstract.Config
	Items []*Answer `json:"items"`
}

func newQuestionConfig(
	params Parameters,
) *QuestionConfig {
	return &QuestionConfig{
		Config: abstract.NewConfig(abstract.ImageFields, abstract.UIImageFieldQuestion),

		PlayTimeLimit: params.PlayTimeLimit,
	}
}
