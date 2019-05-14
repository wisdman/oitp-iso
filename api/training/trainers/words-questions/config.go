package wordsQuestion

import (
	"github.com/wisdman/oitp-isov/api/training/trainers/abstract"
	"github.com/wisdman/oitp-isov/api/training/trainers/question"
)

type Parameters struct {
	TimeLimit uint16 `json:"timeLimit"`

	Quantity int `json:"quantity"`
}

func newQuestionConfig(
	params Parameters,
) *question.Config {
	return &question.Config{
		Config:    abstract.NewConfig(abstract.UIQuestion),
		ItemsType: question.Text,
		Multiple:  false,
		TimeLimit: params.TimeLimit,
	}
}
