package matrixSequence

import (
	"github.com/wisdman/oitp-isov/api/training/trainers/abstract"
)

type Parameters struct {
	TimeLimit uint16 `json:"timeLimit"`

	Quantity int `json:"quantity"`

	MatrixSize  int  `json:"matrixSize"`
	ShowSuccess bool `json:"showSuccess"`
}

type Config struct {
	*abstract.Config

	TimeLimit uint16 `json:"timeLimit"`

	Matrix     []uint16 `json:"matrix"`
	ShowSucess bool     `json:"showSucess"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config:     abstract.NewConfig(abstract.UIMatrixSequence),
		Matrix:     make([]uint16, params.MatrixSize),
		ShowSucess: params.ShowSuccess,
		TimeLimit:  params.TimeLimit,
	}
}
