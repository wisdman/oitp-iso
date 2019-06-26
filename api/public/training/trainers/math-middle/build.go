package mathMiddle

import (
	"context"
	"math/rand"

	"github.com/wisdman/oitp-isov/api/lib/middleware"

	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

var complexity [][](func() *Item)

func init() {
	complexity = append(complexity, complexity_0)
	complexity = append(complexity, complexity_1)
	complexity = append(complexity, complexity_2)
}

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
		abstract.MathMiddle,
	).Scan(&params); err != nil {
		return nil, ctx, err
	}

	quantity := rand.Intn(params.MaxQuantity-params.MinQuantity+1) + params.MinQuantity

	for i := 0; i < quantity; i++ {
		config := newConfig(params)

		length := len(complexity[params.Complexity])
		fn := complexity[params.Complexity][rand.Intn(length)]

		var j int
		for j = 0; j < params.ExamplesCount; j++ {
			config.Items[j] = fn()
		}

		config.Items[j] = fn()
		configs = append(configs, config)
	}

	return configs, ctx, nil
}
