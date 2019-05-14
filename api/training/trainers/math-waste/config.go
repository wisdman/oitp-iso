package mathWaste

import (
	"github.com/wisdman/oitp-isov/api/lib/w-rand"

	"github.com/wisdman/oitp-isov/api/training/trainers/abstract"
	"github.com/wisdman/oitp-isov/api/training/trainers/question"
)

type Parameters struct {
	PlayTimeLimit uint16 `json:"playTimeLimit"`
	Quantity      int    `json:"quantity"`
}

type IType string

const (
	Waste IType = "waste"
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
		Type:      Waste,
		TimeLimit: params.PlayTimeLimit,
		Items:     make([]int, 3),
	}
}

func newQuestionConfig(
	params Parameters,
	items []*question.Item,
) *question.Config {
	wRand.Shuffle(len(items), func(i, j int) { items[i], items[j] = items[j], items[i] })

	return &question.Config{
		Config:    abstract.NewConfig(abstract.UIQuestion),
		Body:      "<h1>Какое из чисел лишнее?</h1>",
		ItemsType: question.Text,
		Multiple:  false,
		Items:     items,
		TimeLimit: params.PlayTimeLimit,
	}
}
