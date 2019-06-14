package relax

import (
	"context"
	"math/rand"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
)

func Build(ctx context.Context) (
	[]interface{},
	context.Context,
	error,
) {
	var configs []interface{}

	sql := middleware.GetDBTransactionFromContext(ctx)

	rows, err := sql.Query(`
    SELECT
      data
    FROM public.trainer_relax
    ORDER BY random()
    LIMIT 1
    `,
	)
	if err != nil {
		return nil, ctx, err
	}
	defer rows.Close()

	for rows.Next() {
		config := newConfig()
		if err = rows.Scan(&config.Text); err != nil {
			return nil, ctx, err
		}
		config.Image = rand.Intn(MAX_RELAX_ID + 1)
		configs = append(configs, config)
	}

	return configs, ctx, nil
}
