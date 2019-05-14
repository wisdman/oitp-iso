package imageExpressions

import (
	"strconv"

	"github.com/wisdman/oitp-isov/api/training/trainers/abstract"
	"github.com/wisdman/oitp-isov/api/training/trainers/question"
)

type Parameters struct {
	ShowTimeLimit     uint16 `json:"showTimeLimit"`
	QuestionTimeLimit uint16 `json:"questionTimeLimit"`

	Quantity int `json:"quantity"`
}

type Config struct {
	*abstract.Config

	TimeLimit uint16 `json:"timeLimit"`

	Image int     `json:"image"`
	Data  *string `json:"data"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config:    abstract.NewConfig(abstract.UIImageExpression),
		TimeLimit: params.ShowTimeLimit,
	}
}

func newQuestionConfig(
	params Parameters,
	Image int,
	Data *string,
) *question.Config {
	return &question.Config{
		Config: abstract.NewConfig(abstract.UIQuestion),

		Body: `<img src="/expressions/` + strconv.Itoa(Image) + `.jpg">`,

		ItemsType: question.InputText,
		Items:     []*question.Item{&question.Item{Data: Data, Correct: true}},

		TimeLimit: params.QuestionTimeLimit,
	}
}
