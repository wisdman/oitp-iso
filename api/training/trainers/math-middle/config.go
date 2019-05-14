package mathMiddle

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
	Middle IType = "middle"
)

type Config struct {
	*abstract.Config

	Type IType `json:"type"`

	TimeLimit uint16  `json:"timeLimit"`
	Items     [][]int `json:"items"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config:    abstract.NewConfig(abstract.UIMathPuzzle),
		Type:      Middle,
		TimeLimit: params.PlayTimeLimit,
		Items:     make([][]int, 3),
	}
}

func newQuestionConfig(
	params Parameters,
	Items [][]int,
) *question.Config {

	body := `<h1 class="h1">` +
		strconv.Itoa(Items[0][0]) + ` ( ` + strconv.Itoa(Items[0][1]) + ` ) ` + strconv.Itoa(Items[0][2]) + `<br>` +
		strconv.Itoa(Items[1][0]) + ` ( ` + strconv.Itoa(Items[1][1]) + ` ) ` + strconv.Itoa(Items[1][2]) + `<br>` +
		strconv.Itoa(Items[2][0]) + ` ( <span class="color-error font-bold">???</span> ) ` + strconv.Itoa(Items[2][2]) +
		`</h1>`

	answer := strconv.Itoa(Items[2][1])

	return &question.Config{
		Config: abstract.NewConfig(abstract.UIQuestion),

		Body: body,

		ItemsType: question.InputNumber,
		Items:     []*question.Item{&question.Item{Data: &answer, Correct: true}},

		TimeLimit: params.PlayTimeLimit,
	}
}
