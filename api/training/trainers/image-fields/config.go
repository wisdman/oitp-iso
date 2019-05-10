package imageFields

import (
	"math/rand"

	"github.com/wisdman/oitp-isov/api/training/trainers"
	"github.com/wisdman/oitp-isov/api/training/trainers/question"
)

type Parameters struct {
	ShowTimeLimit     uint16 `json:"showTimeLimit", description:"Лимит времени предпоказа"`
	QuestionTimeLimit uint16 `json:"questionTimeLimit", description:"Лимит времени вопроса"`

	Quantity int `json:"quantity", description:"Количество таблиц"`

	MinItems int `json:"minItems", description:"Минимальное число картинок на странице"`
	MaxItems int `json:"maxItems", description:"Максимальное число картинок на странице"`

	AnswersCount     int `json:"answersCount", description:"Количество вариантов ответа"`
	FakeAnswersCount int `json:"fakeAnswersCount", description:"Количество фейковых ответов"`
}

type Config struct {
	*trainers.Config

	ShowTimeLimit uint16    `json:"showTimeLimit"`
	Items         []*string `json:"items"`
}

func newConfig(
	params Parameters,
) *Config {
	length := rand.Intn(params.MaxItems-params.MinItems+1) + params.MinItems

	return &Config{
		Config:        trainers.NewConfig(trainers.UIImageField),
		ShowTimeLimit: params.ShowTimeLimit,
		Items:         make([]*string, length),
	}
}

func newQuestionConfig(
	params Parameters,
	items []*question.Item,
) *question.Config {
	rand.Shuffle(len(items), func(i, j int) { items[i], items[j] = items[j], items[i] })

	return &question.Config{
		Config: trainers.NewConfig(trainers.UIQuestion),

		Body: "<h1>Отметьте фигуры встретившиеся вам ранее</h1>",

		ItemsType: question.Image,
		Items:     items[0:params.AnswersCount],
		Multiple:  true,

		TimeLimit: params.QuestionTimeLimit,
	}
}
