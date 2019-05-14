package matrixFilling

import (
	"math/rand"

	"github.com/wisdman/oitp-isov/api/training/trainers/abstract"
	"github.com/wisdman/oitp-isov/api/training/trainers/question"
)

type Parameters struct {
	ShowTimeLimit     uint16 `json:"showTimeLimit"`
	PlayTimeLimit     uint16 `json:"playTimeLimit"`
	QuestionTimeLimit uint16 `json:"questionTimeLimit"`

	Quantity   int `json:"quantity"`
	ItemsSize  int `json:"itemsSize"`
	MatrixSize int `json:"matrixSize"`

	AnswersCount     int `json:"answersCount"`
	FakeAnswersCount int `json:"fakeAnswersCount"`
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

		Items:  make([]int, params.ItemsSize),
		Matrix: make([]uint16, params.MatrixSize),

		ShowTimeLimit: params.ShowTimeLimit,
		PlayTimeLimit: params.PlayTimeLimit,
	}
}

func newQuestionConfig(
	params Parameters,
	items []*question.Item,
) *question.Config {
	rand.Shuffle(len(items), func(i, j int) { items[i], items[j] = items[j], items[i] })

	return &question.Config{
		Config: abstract.NewConfig(abstract.UIQuestion),

		Body: "<h1>Отметьте фигуры встретившиеся вам в таблицах</h1>",

		ItemsType: question.Icon,
		Items:     items[0:params.AnswersCount],
		Multiple:  true,

		TimeLimit: params.QuestionTimeLimit,
	}
}
