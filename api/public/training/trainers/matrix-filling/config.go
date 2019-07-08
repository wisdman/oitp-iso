package matrixFilling

import (
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

type Parameters struct {
	ShowTimeLimit uint16 `json:"showTimeLimit"`
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	MatrixSize int `json:"matrixSize"`
	ItemsCount int `json:"itemsCount"`

	MinQuantity int `json:"minQuantity"`
	MaxQuantity int `json:"maxQuantity"`

	QuestionTimeLimit uint16 `json:"questionTimeLimit"`
	AnswersCount      int    `json:"answersCount"`
}

type Adjustment struct {
	ShowTimeLimit uint16 `json:"showTimeLimit"`

	MatrixSize int `json:"matrixSize"`
	ItemsCount int `json:"itemsCount"`

	MinQuantity int `json:"minQuantity"`
	MaxQuantity int `json:"maxQuantity"`

	AnswersCount int `json:"answersCount"`
}

type Config struct {
	*abstract.Config
	Items  []int    `json:"items"`
	Matrix []uint16 `json:"matrix"`
}

func newConfig(
	id abstract.ITrainer,
	params Parameters,
) *Config {
	return &Config{
		Config: abstract.NewConfig(id, abstract.UIMatrixFilling),

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
	Items []*Answer `json:"items"`
}

func newQuestionConfig(
	id abstract.ITrainer,
	params Parameters,
) *QuestionConfig {
	return &QuestionConfig{
		Config: abstract.NewConfig(id, abstract.UIMatrixFillingQuestion),

		PlayTimeLimit: params.QuestionTimeLimit,
	}
}
