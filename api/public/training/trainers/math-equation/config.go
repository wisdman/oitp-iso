package mathEquation

import (
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

type IOperations string

const (
	IInc IOperations = "+"
	IDec IOperations = "-"
	IMul IOperations = "*"
	INil IOperations = ""
)

var operations = [...]IOperations{IInc, IDec, IMul, INil}
var operationsLen = len(operations)

type Parameters struct {
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	DigitsCount  int `json:"digitsCount"`
	UniqueDigits int `json:"uniqueDigits"`

	Quantity int `json:"quantity"`
}

type Config struct {
	*abstract.Config

	PlayTimeLimit uint16 `json:"playTimeLimit"`
	Equation      string `json:"equation"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config:        abstract.NewConfig(abstract.UIMathEquation),
		PlayTimeLimit: params.PlayTimeLimit,
	}
}
