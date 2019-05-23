// Таблицы с произвольным рассположением чисел.
//
// Пройдите таблицу от 1 до 25 за ограниченное время.
//

package matrixSequence

import (
	"math/rand"

	"github.com/wisdman/oitp-isov/api/lib/db"
)

var complexityRandomData = [...]Parameters{
	Parameters{
		TimeLimit:   30,
		Quantity:    3,
		MatrixSize:  25,
		ShowSuccess: true,
	},
	Parameters{
		TimeLimit:   30,
		Quantity:    3,
		MatrixSize:  25,
		ShowSuccess: false,
	},
	Parameters{
		TimeLimit:   20,
		Quantity:    5,
		MatrixSize:  25,
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
		for j, max := 0, len(config.Matrix); j < max; j++ {
			config.Matrix[j] = uint16(j + 1)
		}
		rand.Shuffle(len(config.Matrix), func(i, j int) { config.Matrix[i], config.Matrix[j] = config.Matrix[j], config.Matrix[i] })
		configs = append(configs, config)
	}

	return configs, nil
}
