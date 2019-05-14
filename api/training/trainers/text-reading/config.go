package textReading

import (
	"github.com/wisdman/oitp-isov/api/training/trainers/abstract"
)

type Parameters struct {
	ShowTimeLimit     uint16 `json:"showTimeLimit"`
	QuestionTimeLimit uint16 `json:"questionTimeLimit"`
}

type Config struct {
	*abstract.Config
	TimeLimit uint16 `json:"timeLimit"`
	Data      string `json:"data"`
	ReadOnly  bool   `json:"readOnly"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config:    abstract.NewConfig(abstract.UITextReading),
		TimeLimit: params.ShowTimeLimit,
	}
}
