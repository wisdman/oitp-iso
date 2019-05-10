package questionWords

import (
	"github.com/wisdman/oitp-isov/api/training/trainers"
	"github.com/wisdman/oitp-isov/api/training/trainers/question"
)

type IWordsType string

const (
	Waste IWordsType = "waste"
	Close IWordsType = "close"
)

type Parameters struct {
	TimeLimit uint16 `json:"timeLimit", description:"Лимит времени"`
	Quantity  int    `json:"quantity", description:"Количество вопросов"`
}

func newQuestionConfig(
	params Parameters,
) *question.Config {
	return &question.Config{
		Config:    trainers.NewConfig(trainers.UIQuestion),
		ItemsType: question.Text,
		Multiple:  false,
		TimeLimit: params.TimeLimit,
	}
}
