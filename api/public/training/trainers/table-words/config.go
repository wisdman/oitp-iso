package tableWords

import (
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

type Parameters struct {
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	MinItems int `json:"minItems"`
	MaxItems int `json:"maxItems"`

	RunesCount int `json:"runesCount"`

	Quantity int `json:"quantity"`
}

type Adjustment struct {
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	MinItems uint16 `json:"minItems"`
	MaxItems uint16 `json:"maxItems"`

	RunesCount int `json:"runesCount"`
}

type Config struct {
	*abstract.Config

	Runes []string `json:"runes"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config: abstract.NewConfig(abstract.TableWords, abstract.UITableWords),

		PlayTimeLimit: params.PlayTimeLimit,
	}
}
