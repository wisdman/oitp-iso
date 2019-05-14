package imageFields

import (
	"github.com/wisdman/oitp-isov/api/lib/w-rand"
	"github.com/wisdman/oitp-isov/api/training/trainers/abstract"
	"github.com/wisdman/oitp-isov/api/training/trainers/question"
)

type Parameters struct {
	ShowTimeLimit     uint16 `json:"pageTimeLimit"`
	QuestionTimeLimit uint16 `json:"playTimeLimit"`

	MinItems int `json:"minItems"`
	MaxItems int `json:"maxItems"`

	AnswersCount     int `json:"answersCount"`
	FakeAnswersCount int `json:"fakeAnswersCount"`

	Quantity int `json:"quantity"`
}

type Config struct {
	*abstract.Config

	TimeLimit uint16 `json:"timeLimit"`
	Items     []int  `json:"items"`
}

func newConfig(
	params Parameters,
) *Config {
	length := wRand.Range(params.MinItems, params.MaxItems)

	return &Config{
		Config:    abstract.NewConfig(abstract.UIImageField),
		TimeLimit: params.ShowTimeLimit,
		Items:     make([]int, length),
	}
}

func newQuestionConfig(
	params Parameters,
	items []*question.Item,
) *question.Config {
	wRand.Shuffle(len(items), func(i, j int) { items[i], items[j] = items[j], items[i] })

	return &question.Config{
		Config: abstract.NewConfig(abstract.UIQuestion),

		Body: "<h1>Отметьте фигуры встретившиеся вам на картинках</h1>",

		ItemsType: question.Icon,
		Items:     items[0:params.AnswersCount],
		Multiple:  true,

		TimeLimit: params.QuestionTimeLimit,
	}
}
