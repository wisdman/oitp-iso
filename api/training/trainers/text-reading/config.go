package textReading

import (
	"github.com/wisdman/oitp-isov/api/training/trainers/abstract"
)

type Parameters struct {
	PlayTimeLimit uint16 `json:"playTimeLimit"`
}

type Config struct {
	*abstract.Config

	Data string `json:"data"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config: abstract.NewConfig(abstract.UITextReading),
	}
}

type Question struct {
	Data    *string `json:"data"`
	Correct *bool   `json:"correct"`
}

type QuestionConfig struct {
	*abstract.Config

	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Data    *string `json:"data"`
	Correct *bool   `json:"correct"`
}

func newQuestionConfig(
	params Parameters,
) *QuestionConfig {
	return &QuestionConfig{
		Config:        abstract.NewConfig(abstract.UITextQuestion),
		PlayTimeLimit: params.PlayTimeLimit,
	}
}
