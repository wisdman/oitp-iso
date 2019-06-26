package tableWords

import (
	"context"
	"math/rand"

	"github.com/wisdman/oitp-isov/api/lib/middleware"

	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

var RUNES_RU = [...]string{"А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Ы", "Э", "Ю", "Я"}

func Build(ctx context.Context) (
	[]interface{},
	context.Context,
	error,
) {
	var configs []interface{}

	sql := middleware.GetDBTransactionFromContext(ctx)

	var params Parameters
	if err := sql.QueryRow(`
    SELECT "complexity"
    FROM public.self_complexity
    WHERE "trainer" = $1`,
		abstract.TableWords,
	).Scan(&params); err != nil {
		return nil, ctx, err
	}

	for i := 0; i < params.Quantity; i++ {
		config := newConfig(params)

		itemsCount := rand.Intn(params.MaxItems-params.MinItems+1) + params.MinItems
		config.Runes = make([]string, itemsCount)

		ids := rand.Perm(len(RUNES_RU))
		for j, max := 0, itemsCount; j < max; j++ {
			config.Runes[j] = RUNES_RU[ids[rand.Intn(params.RunesCount)]]
		}
		configs = append(configs, config)
	}

	return configs, ctx, nil
}
