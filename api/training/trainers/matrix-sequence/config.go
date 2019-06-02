package matrixSequence

import (
	"github.com/wisdman/oitp-isov/api/training/trainers/abstract"
)

type Parameters struct {
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Quantity int `json:"quantity"`

	MatrixSize  int  `json:"matrixSize"`
	ShowSuccess bool `json:"showSuccess"`
}

type Config struct {
	*abstract.Config

	PlayTimeLimit uint16 `json:"playTimeLimit"`
	ShowSucess    bool   `json:"showSucess"`

	Matrix []uint16 `json:"matrix"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config: abstract.NewConfig(abstract.UIMatrixSequence),

		PlayTimeLimit: params.PlayTimeLimit,
		ShowSucess:    params.ShowSuccess,
	}
}
