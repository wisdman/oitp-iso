// Мнемотехника
//
// Соедините картинки по горизонтали ассоциотивной связью.
// Не повторять.
//
// Востановите таблицу по памяти
//

package matrixFilling

import (
	"github.com/wisdman/oitp-isov/api/lib/db"

	"github.com/wisdman/oitp-isov/api/training/trainers/icons"
)

var complexityUniqueData = [...]Parameters{
	Parameters{
		ShowTimeLimit: 20,
		PlayTimeLimit: 30,
		Quantity:      3,
		MatrixSize:    9,
	},
	Parameters{
		ShowTimeLimit: 60,
		PlayTimeLimit: 40,
		Quantity:      3,
		MatrixSize:    16,
	},
	Parameters{
		ShowTimeLimit: 60,
		PlayTimeLimit: 40,
		Quantity:      3,
		MatrixSize:    16,
	},
}

func BuildUnique(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	params := complexityUniqueData[complexity]
	params.ItemsSize = params.MatrixSize

	var iconsCount int = params.ItemsSize * params.Quantity
	iconsList := icons.GetIcons(iconsCount)

	var offset int
	for i := 0; i < params.Quantity; i++ {
		config := newConfig(params)
		for j, max := 0, len(config.Items); j < max; j++ {
			config.Items[j] = iconsList[offset]
			config.Matrix[j] = uint16(j)
			offset++
		}

		configs = append(configs, config)
	}

	return configs, nil
}
