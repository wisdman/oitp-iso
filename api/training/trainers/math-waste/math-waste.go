package mathWaste

import (
	"math/rand"

	"github.com/wisdman/oitp-isov/api/lib/db"
)

var complexityData = [...]Parameters{
	Parameters{
		PlayTimeLimit: 180,
		Level:         0,
		Quantity:      2,
	},
	Parameters{
		PlayTimeLimit: 120,

		Level:    0,
		Quantity: 3,
	},
	Parameters{
		PlayTimeLimit: 60,

		Level:    0,
		Quantity: 4,
	},
}

var levels [][](func() []int)

func init() {
	levels = append(levels, level_0)
	// levels = append(levels, level_1)
	// levels = append(levels, level_2)
}

func Build(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {

	params := complexityData[complexity]

	for i := 0; i < params.Quantity; i++ {
		config := newConfig(params)

		length := len(levels[params.Level])
		fn := levels[params.Level][rand.Intn(length)]

		config.Items = fn()
		configs = append(configs, config)
	}

	return configs, nil
}
