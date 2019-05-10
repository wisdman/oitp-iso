package matrixSequence

import (
	"github.com/wisdman/oitp-isov/api/training/trainers"
)

type Parameters struct {
	TimeLimit uint16 `json:"timeLimit", description:"Лимит времени заполнения"`

	Quantity int `json:"quantity", description:"Количество таблиц"`

	MatrixSize  int  `json:"matrixSize", description:"Размер таблицы"`
	ShowSuccess bool `json:"showSuccess", description:"Показывать результат"`
}

type Config struct {
	*trainers.Config

	TimeLimit uint16 `json:"timeLimit"`

	Matrix     []uint16 `json:"matrix"`
	ShowSucess bool     `json:"showSucess"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config:     trainers.NewConfig(trainers.UIMatrixSequence),
		Matrix:     make([]uint16, params.MatrixSize),
		ShowSucess: params.ShowSuccess,
		TimeLimit:  params.TimeLimit,
	}
}
