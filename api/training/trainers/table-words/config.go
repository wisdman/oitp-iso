package tableWords

import (
	"github.com/wisdman/oitp-isov/api/training/trainers/abstract"
)

type Parameters struct {
	PlayTimeLimit uint16 `json:"playTimeLimit"`
	RunesCount    int    `json:"runesCount"`
}

type Config struct {
	*abstract.Config

	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Runes []string `json:"runes"`
	Title string   `json:"title"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config:        abstract.NewConfig(abstract.UITableWords),
		PlayTimeLimit: params.PlayTimeLimit,

		Runes: make([]string, params.RunesCount),
	}
}
