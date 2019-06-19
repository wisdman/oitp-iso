package mathSequence

import (
	"context"
	"math/rand"
)

var complexityData = [...]Parameters{
	Parameters{
		PlayTimeLimit: 60,

		Level:    0,
		Quantity: 3,
	},
	Parameters{
		PlayTimeLimit: 120,

		Level:    1,
		Quantity: 4,
	},
	Parameters{
		PlayTimeLimit: 60,

		Level:    2,
		Quantity: 4,
	},
}

var levels [][](func() []*Item)

func init() {
	levels = append(levels, level_0)
	levels = append(levels, level_1)
	// levels = append(levels, level_2)
}

func Build(ctx context.Context) (
	[]interface{},
	context.Context,
	error,
) {
	var configs []interface{}

	params := complexityData[0]

	for i := 0; i < params.Quantity; i++ {
		config := newConfig(params)

		length := len(levels[params.Level])
		fn := levels[params.Level][rand.Intn(length)]

		config.Items = fn()
		configs = append(configs, config)
	}

	return configs, ctx, nil
}
