package imageExpressions

import (
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

type Parameters struct {
	UUID abstract.UUID `json:"uuid"`

	ShowTimeLimit uint16 `json:"showTimeLimit"`
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	MinQuantity int `json:"minQuantity"`
	MaxQuantity int `json:"maxQuantity"`
}

type Adjustment struct {
	ShowTimeLimit uint16 `json:"showTimeLimit"`

	MinQuantity int `json:"minQuantity"`
	MaxQuantity int `json:"maxQuantity"`
}

type Config struct {
	*abstract.Config

	ShowTimeLimit uint16 `json:"showTimeLimit"`

	Image int    `json:"image"`
	Data  string `json:"data"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config: abstract.NewConfig(abstract.ImageExpressions, abstract.UIImageExpression, params.UUID),

		ShowTimeLimit: params.ShowTimeLimit,
	}
}

type QuestionConfig struct {
	*abstract.Config

	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Image int    `json:"image"`
	Data  string `json:"data"`
}

func newQuestionConfig(
	params Parameters,
) *QuestionConfig {
	return &QuestionConfig{
		Config: abstract.NewConfig(abstract.ImageExpressions, abstract.UIImageExpressionQuestion, params.UUID),

		PlayTimeLimit: params.PlayTimeLimit,
	}
}
