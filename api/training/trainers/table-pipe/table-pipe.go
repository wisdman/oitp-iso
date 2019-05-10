package tablePipe

import (
	"math/rand"

	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/training/trainers"
)

func Build(
	sql *db.Transaction,
	complexity uint8,
	runeType IRunes,
) (
	configs []interface{},
	err error,
) {
	var params Parameters
	if err = trainers.QueryParameters(sql, trainers.TablePipe, complexity, &params); err != nil {
		return nil, err
	}

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
