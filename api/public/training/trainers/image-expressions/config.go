package imageExpressions

import (
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

type Parameters struct {
	ShowTimeLimit uint16 `json:"showTimeLimit"`
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	MinItems int `json:"minItems"`
	MaxItems int `json:"maxItems"`
}

type Config struct {
	*abstract.Config

	ShowTimeLimit uint16 `json:"showTimeLimit"`

	Image int     `json:"image"`
	Data  *string `json:"data"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config:        abstract.NewConfig(abstract.UIImageExpression),
		ShowTimeLimit: params.ShowTimeLimit,
	}
}

type QuestionConfig struct {
	*abstract.Config

	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Image int     `json:"image"`
	Data  *string `json:"data"`
}

func newQuestionConfig(
	params Parameters,
) *QuestionConfig {
	return &QuestionConfig{
		Config:        abstract.NewConfig(abstract.UIImageExpressionQuestion),
		PlayTimeLimit: params.PlayTimeLimit,
	}
}
