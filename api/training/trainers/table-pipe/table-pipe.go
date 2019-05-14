package tablePipe

import (
	"math/rand"

	"github.com/wisdman/oitp-isov/api/lib/db"
)

var complexityData = [...]Parameters{
	Parameters{
		TimeLimit:  120,
		MatrixSize: 30,
	},
	Parameters{
		TimeLimit:  60,
		MatrixSize: 30,
	},
	Parameters{
		TimeLimit:  30,
		MatrixSize: 30,
	},
}

func build(
	sql *db.Transaction,
	complexity uint8,
	runeType IRunes,
) (
	configs []interface{},
	err error,
) {
	params := complexityData[complexity]

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

	return append(configs, config), nil
}

func BuildRU(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	return build(sql, complexity, RunesRU)
}

func BuildEN(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	return build(sql, complexity, RunesEN)
}

func BuildNUMBERS(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	return build(sql, complexity, RunesNUMBERS)
}
