package mathEquation

import (
	"context"
	"math/rand"
	"strconv"

	"github.com/wisdman/oitp-isov/api/lib/middleware"

	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

func multiRange(min int, max int, count int) []int {
	values := make([]int, count)
	for i := 0; i < count; i++ {
		values[i] = rand.Intn(max-min+1) + min
	}
	return values
}

func newEquation(params Parameters) (result string) {
	digits := multiRange(1, 9, params.UniqueItems)
	digitsLen := len(digits)
	for i, max := 0, rand.Intn(params.MinItems-params.MaxItems+1)+params.MinItems; i < max; i++ {
		if i > 0 {
			operation := operations[rand.Intn(len(operations))]
			result += string(operation)
		}
		digit := strconv.Itoa(digits[rand.Intn(digitsLen)])
		result += string(digit)
	}

	return result
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
		abstract.MathEquation,
	).Scan(&params); err != nil {
		return nil, ctx, err
	}

	quantity := rand.Intn(params.MaxQuantity-params.MinQuantity+1) + params.MinQuantity

	for i := 0; i < quantity; i++ {
		config := newConfig(params)
		config.Equation = newEquation(params)
		configs = append(configs, config)
	}

	return configs, ctx, nil
}
