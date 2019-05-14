package tableWords

import (
	"github.com/wisdman/oitp-isov/api/training/trainers/abstract"
)

type Parameters struct {
	ColumnsCount int    `json:"columnsCount"`
	RunesCount   int    `json:"runesCount"`
	TimeLimit    uint16 `json:"timeLimit"`
}

type Config struct {
	*abstract.Config

	TimeLimit uint16 `json:"timeLimit"`

	Runes   []string `json:"runes"`
	Columns []string `json:"columns"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config:    abstract.NewConfig(abstract.UITableWords),
		TimeLimit: params.TimeLimit,
		Runes:     make([]string, params.RunesCount),
		Columns:   make([]string, params.ColumnsCount),
	}
}
