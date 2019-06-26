package matrixFilling

import (
	"context"
	"math/rand"

	"github.com/wisdman/oitp-isov/api/lib/middleware"

	"github.com/wisdman/oitp-isov/api/public/training/icons"
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

func BuildUnique(ctx context.Context) (
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
		abstract.MatrixFillingUnique,
	).Scan(&params); err != nil {
		return nil, ctx, err
	}

	quantity := rand.Intn(params.MaxQuantity-params.MinQuantity+1) + params.MinQuantity

	icons, ctx := icons.GetIcons(ctx, quantity*params.ItemsCount+params.AnswersCount)
	var offset int

	for i := 0; i < quantity; i++ {
		config := newConfig(abstract.MatrixFillingUnique, params)

		for j, max := 0, len(config.Items); j < max; j++ {
			icon := icons[offset]
			offset++

			config.Items[j] = icon
		}

		config.Matrix = make([]uint16, params.MatrixSize)
		for j, max := 0, len(config.Matrix); j < max; j++ {
			config.Matrix[j] = uint16(j)
		}

		configs = append(configs, config)
	}

	return configs, ctx, nil
}
