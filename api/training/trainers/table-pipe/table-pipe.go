package tablePipe

import (
	"math/rand"
	"time"

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
	rand.Seed(time.Now().UnixNano())

	var parameters Parameters
	if err = trainers.QueryParameters(sql, trainers.TablePipe, complexity, &parameters); err != nil {
		return nil, err
	}

	config := newConfig(parameters)

	itemsLen := len(config.Items)
	matrixLen := len(config.Matrix)

	// Fill items
	runes := getRunes(runeType)
	for i := 0; i < itemsLen; i++ {
		config.Items[i] = &Item{
			Rune:   string(runes[i]),
			Action: actions[i],
		}
	}

	// Fill matrix
	for i := 0; i < matrixLen; i++ {
		config.Matrix[i] = uint16(rand.Intn(itemsLen))
	}

	return append(configs, config), nil
}
