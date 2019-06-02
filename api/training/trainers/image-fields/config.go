package imageFields

import (
	"github.com/wisdman/oitp-isov/api/training/trainers/abstract"
)

type Parameters struct {
	ShowTimeLimit uint16 `json:"pageTimeLimit"`
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	PagesCount int `json:"pagesCount"`
	MinItems   int `json:"minItems"`
	MaxItems   int `json:"maxItems"`

	AnswersCount int `json:"answersCount"`
}

type Answer struct {
	Icon    int  `json:"icon"`
	Correct bool `json:"correct"`
}

type Config struct {
	*abstract.Config

	ShowTimeLimit uint16 `json:"pageTimeLimit"`
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Pages   [][]int   `json:"pages"`
	Answers []*Answer `json:"answers"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config:        abstract.NewConfig(abstract.UIImageField),
		ShowTimeLimit: params.ShowTimeLimit,
		PlayTimeLimit: params.PlayTimeLimit,

		Pages: make([][]int, params.PagesCount),
	}
}
