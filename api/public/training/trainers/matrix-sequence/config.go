package matrixSequence

import (
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

type Parameters struct {
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	MatrixSize int `json:"matrixSize"`

	ShowSuccess bool `json:"showSuccess"`
	UseColors   bool `json:"useColors"`

	MinQuantity int `json:"minQuantity"`
	MaxQuantity int `json:"maxQuantity"`
}

type Adjustment struct {
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	MatrixSize int `json:"matrixSize"`

	ShowSuccess bool `json:"showSuccess"`
	UseColors   bool `json:"useColors"`

	MinQuantity int `json:"minQuantity"`
	MaxQuantity int `json:"maxQuantity"`
}

type Config struct {
	*abstract.Config

	ShowSucess bool `json:"showSucess"`
	UseColors  bool `json:"useColors"`

	Matrix []uint16 `json:"matrix"`
}

func newConfig(
	id abstract.ITrainer,
	params Parameters,
) *Config {
	return &Config{
		Config: abstract.NewConfig(id, abstract.UIMatrixSequence),

		PlayTimeLimit: params.PlayTimeLimit,

		ShowSucess: params.ShowSuccess,
		UseColors:  params.UseColors,
	}
}
