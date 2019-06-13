package imageCarpets

import (
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

type Parameters struct {
	ShowTimeLimit uint16 `json:"showTimeLimit"`
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Complexity int `json:"complexity"`
	Quantity   int `json:"quantity"`
}

type Item struct {
	id uint16 `json:"id"`
	X  uint16 `json:"x"`
	Y  uint16 `json:"y"`
}

type Config struct {
	*abstract.Config

	ShowTimeLimit uint16 `json:"showTimeLimit"`
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Items  []*string `json:"items"`
	Matrix []*Item   `json:"matrix"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config:        abstract.NewConfig(abstract.UIImageCarpet),
		ShowTimeLimit: params.ShowTimeLimit,
		PlayTimeLimit: params.PlayTimeLimit,
	}
}
