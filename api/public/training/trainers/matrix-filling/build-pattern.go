package matrixFilling

import (
	"context"
	"math/rand"

	"github.com/wisdman/oitp-isov/api/lib/middleware"

	"github.com/wisdman/oitp-isov/api/public/training/icons"
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

func BuildPattern(ctx context.Context) (
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
		abstract.MatrixFillingPattern,
	).Scan(&params); err != nil {
		return nil, ctx, err
	}

	quantity := rand.Intn(params.MaxQuantity-params.MinQuantity+1) + params.MinQuantity

	questionConfig := newQuestionConfig(abstract.MatrixFillingPattern, params)

	icons, ctx := icons.GetIcons(ctx, quantity*params.ItemsCount+params.AnswersCount)
	var offset int

	rows, err := sql.Query(`
    SELECT
      "data"
    FROM public.trainer_patterns
    WHERE
      "type" = 'images'
      AND
      array_length("data", 1) = $1
    ORDER BY random()
    LIMIT $2
    `,
		params.MatrixSize,
		quantity,
	)
	if err != nil {
		return nil, ctx, err
	}
	defer rows.Close()

	for rows.Next() {
		config := newConfig(abstract.MatrixFillingPattern, params)
		if err = rows.Scan(&config.Matrix); err != nil {
			return nil, ctx, err
		}

		var maxIdx uint16
		for i, e := range config.Matrix {
			if i == 0 || e > maxIdx {
				maxIdx = e
			}
		}

		for i, max := 0, len(config.Items); i < max; i++ {
			icon := icons[offset]
			offset++

			config.Items[i] = icon

			if i > int(maxIdx) {
				continue
			}

			if rand.Intn(2) == 1 { // true or false
				questionConfig.Items = append(questionConfig.Items, &Answer{
					Icon:    icon,
					Correct: true,
				})
			}
		}

		configs = append(configs, config)
	}

	// Generate fake answers
	for i, max := 0, params.AnswersCount-len(questionConfig.Items); i < max; i++ {
		questionConfig.Items = append(questionConfig.Items, &Answer{
			Icon:    icons[offset],
			Correct: false,
		})
		offset++
	}

	configs = append(configs, questionConfig)
	return configs, ctx, nil
}
