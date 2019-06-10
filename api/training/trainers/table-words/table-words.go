package tableWords

import (
	"math/rand"

	"github.com/wisdman/oitp-isov/api/lib/db"
)

var RUNES_RU = [...]string{"А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Ы", "Э", "Ю", "Я"}

var groups = [...]string{"Моря", "Страны", "Животные", "Рыбы", "Птицы", "Столицы"}

var complexityData = [...]Parameters{
	Parameters{
		PlayTimeLimit: 120,
		RunesCount:    5,
	},
	Parameters{
		PlayTimeLimit: 120,
		RunesCount:    5,
	},
	Parameters{
		PlayTimeLimit: 120,
		RunesCount:    5,
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

	ids := rand.Perm(len(RUNES_RU))
	for i := 0; i < params.RunesCount; i++ {
		config.Runes[i] = RUNES_RU[ids[i]]
	}

	config.Title = groups[rand.Intn(len(groups))]

	configs = append(configs, config)
	return configs, nil
}
