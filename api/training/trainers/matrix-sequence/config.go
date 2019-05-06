package matrixSequence

import (
	"github.com/wisdman/oitp-isov/api/training/trainers"
)

type Parameters struct {
	*trainers.Parameters

	Size        uint8 `json:"size", description:"Размер таблицы"`
	ShowSuccess bool  `json:"showSuccess", description:"Показывать результат"`

	Quantity uint8 `json:"quantity", description:"Количество таблиц подряд"`
}

type Config struct {
	*trainers.Config

	Matrix     []uint16 `json:"matrix"`
	ShowSucess bool     `json:"showSucess"`
}

func newConfig(
	param Parameters,
) *Config {
	return &Config{
		Config:     trainers.NewConfig(trainers.UIMatrixSequence, param.TimeLimit),
		Matrix:     make([]uint16, param.Size),
		ShowSucess: param.ShowSuccess,
	}
}
