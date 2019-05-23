// Вариативность мышления
//
// Заполните таблицу, орентируясь на тематическую группу и буквы
//

package tableWords

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/lib/w-rand"
)

var arr_ALPHABET_RU = [...]rune{'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ы', 'Э', 'Ю', 'Я'}

var groups = [...]string{"Моря", "Страны", "Животные", "Рыбы", "Птицы", "Столицы"}

var complexityData = [...]Parameters{
	Parameters{
		TimeLimit:    120,
		ColumnsCount: 1,
		RunesCount:   5,
	},
	Parameters{
		TimeLimit:    120,
		ColumnsCount: 2,
		RunesCount:   5,
	},
	Parameters{
		TimeLimit:    120,
		ColumnsCount: 3,
		RunesCount:   5,
	},
}

func Build(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	params := complexityData[complexity]
	config := newConfig(params)

	randRunes := wRand.NewUnique()
	runeIDs := randRunes.MultiRange(0, len(arr_ALPHABET_RU)-1, params.RunesCount)

	for i, max := 0, len(config.Runes); i < max; i++ {
		config.Runes[i] = string(arr_ALPHABET_RU[runeIDs[i]])
	}

	randGroups := wRand.NewUnique()
	groupsIDs := randGroups.MultiRange(0, len(groups)-1, params.ColumnsCount)

	for i, max := 0, len(config.Columns); i < max; i++ {
		config.Columns[i] = groups[groupsIDs[i]]
	}

	configs = append(configs, config)
	return configs, nil
}
