package tableWords

import (
	"context"
	"math/rand"
)

var RUNES_RU = [...]string{"А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Ы", "Э", "Ю", "Я"}

var groups = [...]string{"Моря", "Страны", "Животные", "Рыбы", "Птицы", "Столицы"}

var complexityData = [...]Parameters{
	Parameters{
		PlayTimeLimit: 60,
		RunesCount:    10,
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

func Build(ctx context.Context) (
	[]interface{},
	context.Context,
	error,
) {
	var configs []interface{}

	params := complexityData[0]
	config := newConfig(params)

	ids := rand.Perm(len(RUNES_RU))
	for i := 0; i < params.RunesCount; i++ {
		config.Runes[i] = RUNES_RU[ids[i]]
	}

	config.Title = groups[rand.Intn(len(groups))]

	configs = append(configs, config)
	return configs, ctx, nil
}
