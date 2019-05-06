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

	Body      string     `json:"body"`
	ItemsType IItemsType `json:"itemsType"`
	Multiple  bool       `json:"multiple"`

	Items []*Item `json:"items"`
}

func NewConfig(
	timeLimit uint16,
	body string,
	itemsType IItemsType,
	multiple bool,
	items []*Item,
) *Config {
	return &Config{
		Config: trainers.NewConfig(trainers.UIQuestion, timeLimit),

		Body:      body,
		ItemsType: itemsType,
		Multiple:  multiple,

		Items: items,
	}
}
