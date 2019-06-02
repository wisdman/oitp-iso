// Пространство и логика
//
// Оприделите лишнюю фигуру
//

package spaceQuestions

import (
	"github.com/wisdman/oitp-isov/api/training/trainers/abstract"
)

type Parameters struct {
	PlayTimeLimit uint16 `json:"playTimeLimit"`
	Quantity      int    `json:"quantity"`
}

type Answer struct {
	Icon    int  `json:"icon"`
	Correct bool `json:"correct"`
}

type Config struct {
	*abstract.Config

	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Items []*Answer `json:"items"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config:        abstract.NewConfig(abstract.UIImageFieldQuestion),
		PlayTimeLimit: params.PlayTimeLimit,
	}
}
