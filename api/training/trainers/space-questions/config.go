package spaceQuestions

import (
	"github.com/wisdman/oitp-isov/api/lib/w-rand"

	"github.com/wisdman/oitp-isov/api/training/trainers/abstract"
	"github.com/wisdman/oitp-isov/api/training/trainers/question"
)

type Parameters struct {
	TimeLimit uint16 `json:"timeLimit"`
	Quantity  int    `json:"quantity"`
}

func newQuestionConfig(
	params Parameters,
	items []*question.Item,
) *question.Config {
	wRand.Shuffle(len(items), func(i, j int) { items[i], items[j] = items[j], items[i] })

	return &question.Config{
		Config: abstract.NewConfig(abstract.UIQuestion),

		Body: "",

		ItemsType: question.Image,
		Items:     items,

		TimeLimit: params.TimeLimit,
	}
}
