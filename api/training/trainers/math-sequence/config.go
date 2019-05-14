package mathSequence

import (
	"strconv"

	"github.com/wisdman/oitp-isov/api/training/trainers/abstract"
	"github.com/wisdman/oitp-isov/api/training/trainers/question"
)

type Parameters struct {
	PlayTimeLimit uint16 `json:"playTimeLimit"`
	Quantity      int    `json:"quantity"`
}

type IType string

const (
	Sequence IType = "sequence"
)

type Config struct {
	*abstract.Config

	Type IType `json:"type"`

	TimeLimit uint16 `json:"timeLimit"`
	Items     []int  `json:"items"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config:    abstract.NewConfig(abstract.UIMathPuzzle),
		Type:      Sequence,
		TimeLimit: params.PlayTimeLimit,
		Items:     make([]int, 3),
	}
}

func newQuestionConfig(
	params Parameters,
	Items []int,
) *question.Config {
	var body string = `<h1 class="h1">`
	for i, max := 0, len(Items)-1; i < max; i++ {
		body += strconv.Itoa(Items[i]) + `, `
	}
	body += `<span class="color-error font-bold">???</span></h1>`

	answer := strconv.Itoa(Items[len(Items)-1])

	return &question.Config{
		Config: abstract.NewConfig(abstract.UIQuestion),

		Body: body,

		ItemsType: question.InputNumber,
		Items:     []*question.Item{&question.Item{Data: &answer, Correct: true}},

		TimeLimit: params.PlayTimeLimit,
	}
}
