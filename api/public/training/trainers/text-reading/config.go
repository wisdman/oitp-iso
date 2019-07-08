package textReading

import (
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

type Parameters struct {
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Completed []int `json:"completed"`

	Quantity int `json:"quantity"`
}

type Adjustment struct {
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Completed []int `json:"completed"`
}

type Config struct {
	*abstract.Config

	Data string `json:"data"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config: abstract.NewConfig(abstract.TextReading, abstract.UITextReading),
	}
}

type Question struct {
	Data    *string `json:"data"`
	Correct *bool   `json:"correct"`
}

type QuestionConfig struct {
	*abstract.Config

	Data    *string `json:"data"`
	Correct *bool   `json:"correct"`
}

func newQuestionConfig(
	params Parameters,
) *QuestionConfig {
	return &QuestionConfig{
		Config: abstract.NewConfig(abstract.TextReading, abstract.UITextReadingQuestion),

		PlayTimeLimit: params.PlayTimeLimit,
	}
}
