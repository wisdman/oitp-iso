package matrixFilling

import (
	"math/rand"

	"github.com/wisdman/oitp-isov/api/training/trainers"
	"github.com/wisdman/oitp-isov/api/training/trainers/question"
)

type Parameters struct {
	ShowTimeLimit     uint16 `json:"showTimeLimit", description:"Лимит времени предпоказа"`
	PlayTimeLimit     uint16 `json:"playTimeLimit", description:"Лимит времени заполнения"`
	QuestionTimeLimit uint16 `json:"questionTimeLimit", description:"Лимит времени вопроса"`

	Quantity   int `json:"quantity", description:"Количество таблиц"`
	ItemsSize  int `json:"itemsSize", description:"Количество элементов"`
	MatrixSize int `json:"matrixSize", description:"Размер таблицы"`

	AnswersCount     int `json:"answersCount", description:"Количество вариантов ответа"`
	FakeAnswersCount int `json:"fakeAnswersCount", description:"Количество фейковых ответов"`
}

type Config struct {
	*trainers.Config

	ShowTimeLimit uint16 `json:"showTimeLimit"`
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Items  []*string `json:"items"`
	Matrix []uint16  `json:"matrix"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config: trainers.NewConfig(trainers.UIMatrixFilling),

		Items:  make([]*string, params.ItemsSize),
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
		Config: trainers.NewConfig(trainers.UIQuestion),

		Body: "<h1>Отметьте фигуры встретившиеся вам в таблицах</h1>",

		ItemsType: question.Image,
		Items:     items[0:params.AnswersCount],
		Multiple:  true,

		TimeLimit: params.QuestionTimeLimit,
	}
}
