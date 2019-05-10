package classificationWords

import (
	"github.com/wisdman/oitp-isov/api/training/trainers"
)

type Parameters struct {
	TimeLimit     uint16 `json:"timeLimit", description:"Лимит времени"`
	WordTimeLimit uint16 `json:"wordTimeLimit", description:"Лимит времени на одно слово"`

	Quantity int `json:"quantity", description:"Количество групп"`
	MinItems int `json:"minItems", description:"Минимальное число слов из группы"`
	MaxItems int `json:"maxItems", description:"Максимальное число слов из группы"`
}

type Item struct {
	Group string `json:"group"`
	Data  string `json:"data"`
}

type Config struct {
	*trainers.Config

	TimeLimit     uint16 `json:"timeLimit"`
	WordTimeLimit uint16 `json:"wordTimeLimit"`

	Items []*Item `json:"items"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config:        trainers.NewConfig(trainers.UIClassificationWords),
		TimeLimit:     params.TimeLimit,
		WordTimeLimit: params.WordTimeLimit,
	}
}
