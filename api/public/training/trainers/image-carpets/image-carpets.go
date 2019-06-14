package imageCarpets

import (
	"context"
	"math/rand"
)

const MAX_CARPET_ID = 86

var complexityData = [...]Parameters{
	Parameters{
		ShowTimeLimit: 5,
		PlayTimeLimit: 30,

		Complexity: 1,
		Quantity:   3,
	},
	Parameters{
		ShowTimeLimit: 5,
		PlayTimeLimit: 30,

		Complexity: 1,
		Quantity:   3,
	},
	Parameters{
		ShowTimeLimit: 5,
		PlayTimeLimit: 30,

		Complexity: 1,
		Quantity:   3,
	},
}

func Build(ctx context.Context) (
	[]interface{},
	context.Context,
	error,
) {
	var configs []interface{}

	params := complexityData[0]

	for _, value := range rand.Perm(MAX_CARPET_ID)[:params.Quantity] {
		config := newConfig(params)
		config.Item = value
		configs = append(configs, config)
	}

	return configs, ctx, nil
}
