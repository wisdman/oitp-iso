package tableWords

import (
	"context"
	"math/rand"
)

var RUNES_RU = [...]string{"А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Ы", "Э", "Ю", "Я"}

var complexityData = [...]Parameters{
	Parameters{
		PlayTimeLimit: 60,
		RunesCount:    1,
		ItemsCount:    10,
	},
	Parameters{
		PlayTimeLimit: 120,
		RunesCount:    2,
		ItemsCount:    10,
	},
	Parameters{
		PlayTimeLimit: 120,
		RunesCount:    3,
		ItemsCount:    20,
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
	for i, max := 0, len(config.Runes); i < max; i++ {
		config.Runes[i] = RUNES_RU[ids[rand.Intn(params.RunesCount)]]
	}

	configs = append(configs, config)
	return configs, ctx, nil
}
