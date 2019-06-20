package tableWords

import (
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

type Parameters struct {
	PlayTimeLimit uint16 `json:"playTimeLimit"`
	ItemsCount    int    `json:"itemsCount"`
	RunesCount    int    `json:"runesCount"`
}

type Config struct {
	*abstract.Config

	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Runes []string `json:"runes"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config:        abstract.NewConfig(abstract.UITableWords),
		PlayTimeLimit: params.PlayTimeLimit,

		Runes: make([]string, params.ItemsCount),
	}
}
