package mathMiddle

import (
	"math/rand"

	"github.com/wisdman/oitp-isov/api/lib/db"
)

var complexityData = [...]Parameters{
	Parameters{
		PlayTimeLimit: 120,

		Level:         0,
		ExamplesCount: 2,

		Quantity: 3,
	},
	Parameters{
		PlayTimeLimit: 60,

		Level:         1,
		ExamplesCount: 2,

		Quantity: 4,
	},
	Parameters{
		PlayTimeLimit: 30,

		Level:         2,
		ExamplesCount: 2,

		Quantity: 4,
	},
}

var levels [][](func() *Item)

func init() {
	levels = append(levels, level_0)
	levels = append(levels, level_1)
	levels = append(levels, level_2)
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

		var j int
		for j = 0; j < params.ExamplesCount; j++ {
			config.Items[j] = fn()
		}

		config.Items[j] = fn()
		configs = append(configs, config)
	}

	return configs, nil
}
