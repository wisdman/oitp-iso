package tablePipe

import (
	"context"
	"math/rand"

	"github.com/wisdman/oitp-isov/api/lib/middleware"

	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

func build(ctx context.Context, id abstract.ITrainer) (
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
		id,
	).Scan(&params); err != nil {
		return nil, ctx, err
	}

	config := newConfig(id, params)
	itemsLen := len(config.Items)

	// Fill items
	runes := getRunes(id)
	for i := 0; i < itemsLen; i++ {
		config.Items[i] = &Item{
			Rune:   string(runes[i]),
			Action: actions[i],
		}
	}

	// Fill matrix
	for i, max := 0, len(config.Matrix); i < max; i++ {
		config.Matrix[i] = uint16(rand.Intn(itemsLen))
	}

	return append(configs, config), ctx, nil
}

func BuildRU(ctx context.Context) (
	[]interface{},
	context.Context,
	error,
) {
	return build(ctx, abstract.TablePipeRU)
}

func BuildEN(ctx context.Context) (
	[]interface{},
	context.Context,
	error,
) {
	return build(ctx, abstract.TablePipeEN)
}

func BuildNUMBERS(ctx context.Context) (
	[]interface{},
	context.Context,
	error,
) {
	return build(ctx, abstract.TablePipeNumber)
}
