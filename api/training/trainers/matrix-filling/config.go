package matrixFilling

import (
	"github.com/wisdman/oitp-isov/api/training/trainers/abstract"
)

type Parameters struct {
	ShowTimeLimit     uint16 `json:"showTimeLimit"`
	PlayTimeLimit     uint16 `json:"playTimeLimit"`
	QuestionTimeLimit uint16 `json:"questionTimeLimit"`

	Quantity   int `json:"quantity"`
	MatrixSize int `json:"matrixSize"`
	ItemsCount int `json:"itemsSize"`

	AnswersCount int `json:"answersCount"`
}

type Config struct {
	*abstract.Config

	ShowTimeLimit uint16 `json:"showTimeLimit"`
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Items  []int    `json:"items"`
	Matrix []uint16 `json:"matrix"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config: abstract.NewConfig(abstract.UIMatrixFilling),

		Items: make([]int, params.ItemsCount),

		ShowTimeLimit: params.ShowTimeLimit,
		PlayTimeLimit: params.PlayTimeLimit,
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
		Config:        abstract.NewConfig(abstract.UIMatrixFillingQuestion),
		PlayTimeLimit: params.QuestionTimeLimit,
	}
}
