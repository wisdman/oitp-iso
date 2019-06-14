package matrixFilling

import (
	"context"

	"github.com/wisdman/oitp-isov/api/public/training/icons"
)

var complexityUniqueData = [...]Parameters{
	Parameters{
		ShowTimeLimit: 30,
		PlayTimeLimit: 60,

		Quantity:   3,
		MatrixSize: 9,
		ItemsCount: 15,
	},
	Parameters{
		ShowTimeLimit: 60,
		PlayTimeLimit: 40,

		Quantity:   3,
		MatrixSize: 16,
		ItemsCount: 15,
	},
	Parameters{
		ShowTimeLimit: 60,
		PlayTimeLimit: 40,

		Quantity:   3,
		MatrixSize: 16,
		ItemsCount: 15,
	},
}

func BuildUnique(ctx context.Context) (
	[]interface{},
	context.Context,
	error,
) {
	var configs []interface{}

	params := complexityUniqueData[0]

	icons, ctx := icons.GetIcons(ctx, params.Quantity*params.ItemsCount+params.AnswersCount)
	var offset int

	for i := 0; i < params.Quantity; i++ {
		config := newConfig(params)

		for j, max := 0, len(config.Items); j < max; j++ {
			icon := icons[offset]
			offset++

			config.Items[j] = icon
		}

		config.Matrix = make([]uint16, params.MatrixSize)
		for j, max := 0, len(config.Matrix); j < max; j++ {
			config.Matrix[j] = uint16(j)
		}

		configs = append(configs, config)
	}

	return configs, ctx, nil
}
