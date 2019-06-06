package wordsLexis

import (
	"github.com/wisdman/oitp-isov/api/training/trainers/abstract"
)

type Parameters struct {
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	ItemsCount int `json:"itemsCount"`
	Quantity   int `json:"quantity"`
}

type IItemsType string

const (
	Antonyms IItemsType = "antonyms"
	Paronyms IItemsType = "paronyms"
	Synonyms IItemsType = "synonyms"
)

type Config struct {
	*abstract.Config
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	ItemsType IItemsType  `json:"itemsType"`
	Items     [][]*string `json:"items"`
}

func newConfig(
	params Parameters,
	itemsType IItemsType,

) *Config {
	return &Config{
		Config:        abstract.NewConfig(abstract.UIWordsLexis),
		PlayTimeLimit: params.PlayTimeLimit,
		ItemsType:     itemsType,
	}
}
