package tablePipe

import (
	"context"
	"math/rand"
)

var complexityData = [...]Parameters{
	Parameters{
		PlayTimeLimit: 120,
		MatrixSize:    30,
	},
	Parameters{
		PlayTimeLimit: 60,
		MatrixSize:    30,
	},
	Parameters{
		PlayTimeLimit: 30,
		MatrixSize:    30,
	},
}

func build(ctx context.Context, runeType IRunes) (
	[]interface{},
	context.Context,
	error,
) {
	var configs []interface{}

	params := complexityData[0]

	config := newConfig(params)
	itemsLen := len(config.Items)

	// Fill items
	runes := getRunes(runeType)
	for i := 0; i < itemsLen; i++ {
		config.Items[i] = &Item{
			Rune:   string(runes[i]),
			Action: actions[i],
		}
	}

	// Fill matrix
	for i, max := 0, len(config.Matrix); i < max; i++ {
		config.Matrix[i] = uint16(rand.Intn(itemsLen))
	}

	return append(configs, config), ctx, nil
}

func BuildRU(ctx context.Context) (
	[]interface{},
	context.Context,
	error,
) {
	return build(ctx, RunesRU)
}

func BuildEN(ctx context.Context) (
	[]interface{},
	context.Context,
	error,
) {
	return build(ctx, RunesEN)
}

func BuildNUMBERS(ctx context.Context) (
	[]interface{},
	context.Context,
	error,
) {
	return build(ctx, RunesNUMBERS)
}
