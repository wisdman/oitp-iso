package question

import (
	"github.com/wisdman/oitp-isov/api/training/trainers/abstract"
)

type IItemsType string

const (
	Image       IItemsType = "image"
	Icon        IItemsType = "icon"
	InputNumber IItemsType = "input-number"
	InputText   IItemsType = "input-text"
	None        IItemsType = "none"
	Text        IItemsType = "text"
)

type Item struct {
	Data    *string `json:"data"`
	Correct bool    `json:"correct"`
}

type Config struct {
	*abstract.Config

	TimeLimit uint16 `json:"timeLimit"`

	Body      string     `json:"body"`
	ItemsType IItemsType `json:"itemsType"`
	Multiple  bool       `json:"multiple"`

	Items []*Item `json:"items"`
}
