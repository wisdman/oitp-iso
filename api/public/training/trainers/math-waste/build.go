package mathWaste

import (
	"context"
	"math/rand"

	"github.com/wisdman/oitp-isov/api/lib/middleware"

	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

var complexity [][](func() []int)

func init() {
	complexity = append(complexity, complexity_0)
	// levels = append(levels, level_1)
	// levels = append(levels, level_2)
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
		abstract.MathWaste,
	).Scan(&params); err != nil {
		return nil, ctx, err
	}

	quantity := rand.Intn(params.MaxQuantity-params.MinQuantity+1) + params.MinQuantity

	for i := 0; i < quantity; i++ {
		config := newConfig(params)

		length := len(complexity[params.Complexity])
		fn := complexity[params.Complexity][rand.Intn(length)]

		config.Items = fn()
		configs = append(configs, config)
	}

	return configs, ctx, nil
}
