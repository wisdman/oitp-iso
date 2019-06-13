package imageFields

import (
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

type Parameters struct {
	ShowTimeLimit uint16 `json:"showTimeLimit"`
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Quantity int `json:"quantity"`
	MinItems int `json:"minItems"`
	MaxItems int `json:"maxItems"`

	AnswersCount int `json:"answersCount"`
}

type Config struct {
	*abstract.Config

	ShowTimeLimit uint16 `json:"showTimeLimit"`

	Items []int `json:"items"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config:        abstract.NewConfig(abstract.UIImageField),
		ShowTimeLimit: params.ShowTimeLimit,
	}
}

type Answer struct {
	Icon    int  `json:"icon"`
	Correct bool `json:"correct"`
}

type QuestionConfig struct {
	*abstract.Config

	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Items []*Answer `json:"items"`
}

func newQuestionConfig(
	params Parameters,
) *QuestionConfig {
	return &QuestionConfig{
		Config:        abstract.NewConfig(abstract.UIImageFieldQuestion),
		PlayTimeLimit: params.PlayTimeLimit,
	}
}