package mathEquation

import (
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

type Parameters struct {
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	MinItems int `json:"minItems"`
	MaxItems int `json:"maxItems"`

	UniqueItems int `json:"uniqueItems"`

	MinQuantity int `json:"minQuantity"`
	MaxQuantity int `json:"maxQuantity"`
}

type Adjustment struct {
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	MinItems int `json:"minItems"`
	MaxItems int `json:"maxItems"`

	UniqueItems int `json:"uniqueItems"`

	MinQuantity int `json:"minQuantity"`
	MaxQuantity int `json:"maxQuantity"`
}

type IOperations string

const (
	IInc IOperations = "+"
	IDec IOperations = "-"
	IMul IOperations = "*"
	INil IOperations = ""
)

var operations = [...]IOperations{IInc, IDec, IMul, INil}

type Config struct {
	*abstract.Config

	PlayTimeLimit uint16 `json:"playTimeLimit"`
	Equation      string `json:"equation"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config: abstract.NewConfig(abstract.MathEquation, abstract.UIMathEquation),

		PlayTimeLimit: params.PlayTimeLimit,
	}
}
