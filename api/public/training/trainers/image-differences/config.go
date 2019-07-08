package imageDifferences

import (
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

type Parameters struct {
	ShowTimeLimit uint16 `json:"showTimeLimit"`
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Complexity uint16 `json:"complexity"`

	MinQuantity int `json:"minQuantity"`
	MaxQuantity int `json:"maxQuantity"`
}

type Adjustment struct {
	ShowTimeLimit uint16 `json:"showTimeLimit"`
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Complexity uint16 `json:"complexity"`

	MinQuantity int `json:"minQuantity"`
	MaxQuantity int `json:"maxQuantity"`
}

type Config struct {
	*abstract.Config

	ItemsA int `json:"itemsA"`
	ItemsB int `json:"itemsB"`

	Diffs []*string `json:"diffs"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config: abstract.NewConfig(abstract.ImageDifferences, abstract.UIImageDifferences),

		ShowTimeLimit: params.ShowTimeLimit,
		PlayTimeLimit: params.PlayTimeLimit,
	}
}
