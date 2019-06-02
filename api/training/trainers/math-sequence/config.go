package mathSequence

import (
	"github.com/wisdman/oitp-isov/api/training/trainers/abstract"
)

var RUNES = [...]string{"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"}

type Parameters struct {
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Level    int `json:"level"`
	Quantity int `json:"quantity"`
}

type Item struct {
	Rune string `json:"rune"`
	Data int    `json:"data"`
	Act  string `json:"act"`
}

type Config struct {
	*abstract.Config

	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Items []*Item `json:"items"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config:        abstract.NewConfig(abstract.UIMathSequence),
		PlayTimeLimit: params.PlayTimeLimit,
	}
}
