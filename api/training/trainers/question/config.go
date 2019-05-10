package question

import (
	"github.com/wisdman/oitp-isov/api/training/trainers"
)

type IItemsType string

const (
	Image IItemsType = "image"
	Input IItemsType = "input"
	None  IItemsType = "none"
	Text  IItemsType = "text"
)

type Item struct {
	Data    *string `json:"data"`
	Correct bool    `json:"correct"`
}

type Config struct {
	*trainers.Config

	TimeLimit uint16 `json:"timeLimit"`

	Body      string     `json:"body"`
	ItemsType IItemsType `json:"itemsType"`
	Multiple  bool       `json:"multiple"`

	Items []*Item `json:"items"`
}
