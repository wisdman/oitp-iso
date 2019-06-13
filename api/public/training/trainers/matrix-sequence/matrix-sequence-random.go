package matrixSequence

import (
	"math/rand"

	"github.com/wisdman/oitp-isov/api/lib/db"
)

var complexityRandomData = [...]Parameters{
	Parameters{
		PlayTimeLimit: 30,

		Quantity:   3,
		MatrixSize: 25,

		ShowSuccess: true,
	},
	Parameters{
		PlayTimeLimit: 30,

		Quantity:   3,
		MatrixSize: 25,

		ShowSuccess: false,
	},
	Parameters{
		PlayTimeLimit: 20,

		Quantity:   5,
		MatrixSize: 25,

		ShowSuccess: false,
	},
}

func BuildRandom(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	params := complexityRandomData[complexity]

	for i := 0; i < params.Quantity; i++ {
		config := newConfig(params)
		config.Matrix = make([]uint16, params.MatrixSize)
		for j := 0; j < params.MatrixSize; j++ {
			config.Matrix[j] = uint16(j + 1)
		}
		rand.Shuffle(len(config.Matrix), func(i, j int) { config.Matrix[i], config.Matrix[j] = config.Matrix[j], config.Matrix[i] })
		configs = append(configs, config)
	}

	return configs, nil
}
