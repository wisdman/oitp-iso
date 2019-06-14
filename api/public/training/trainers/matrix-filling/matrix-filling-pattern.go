package matrixFilling

import (
	"context"
	"math/rand"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
	"github.com/wisdman/oitp-isov/api/public/training/icons"
)

var complexityPatternData = [...]Parameters{
	Parameters{
		ShowTimeLimit:     7,
		PlayTimeLimit:     60,
		QuestionTimeLimit: 60,

		Quantity:   3,
		MatrixSize: 9,
		ItemsCount: 8,

		AnswersCount: 10,
	},
	Parameters{
		ShowTimeLimit:     5,
		PlayTimeLimit:     30,
		QuestionTimeLimit: 30,

		Quantity:   3,
		MatrixSize: 16,
		ItemsCount: 8,

		AnswersCount: 10,
	},
	Parameters{
		ShowTimeLimit:     5,
		PlayTimeLimit:     30,
		QuestionTimeLimit: 30,

		Quantity:   3,
		MatrixSize: 16,
		ItemsCount: 10,

		AnswersCount: 10,
	},
}

func BuildPattern(ctx context.Context) (
	[]interface{},
	context.Context,
	error,
) {
	var configs []interface{}

	sql := middleware.GetDBTransactionFromContext(ctx)
	params := complexityPatternData[0]
	questionConfig := newQuestionConfig(params)

	icons, ctx := icons.GetIcons(ctx, params.Quantity*params.ItemsCount+params.AnswersCount)
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
		params.Quantity,
	)
	if err != nil {
		return nil, ctx, err
	}
	defer rows.Close()

	for rows.Next() {
		config := newConfig(params)
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

			if rand.Intn(2) == 1 {
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
