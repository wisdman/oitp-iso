package wordsPairs

import (
	"github.com/wisdman/oitp-isov/api/training/trainers/abstract"
)

type Parameters struct {
	TimeLimit  uint16 `json:"timeLimit"`
	ItemsCount uint16 `json:"itemsCount"`

	Quantity int `json:"quantity"`
}

type IItemsType string

const (
	Antonyms IItemsType = "antonyms"
	Paronyms IItemsType = "paronyms"
	Synonyms IItemsType = "synonyms"
)

type Config struct {
	*abstract.Config
	TimeLimit uint16 `json:"timeLimit"`

	ItemsType IItemsType  `json:"itemsType"`
	Items     [][]*string `json:"items"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config:    abstract.NewConfig(abstract.UIWordsPairs),
		TimeLimit: params.TimeLimit,
	}
}
