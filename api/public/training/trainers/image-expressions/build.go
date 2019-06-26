package imageExpressions

import (
	"context"
	"math/rand"

	"github.com/wisdman/oitp-isov/api/lib/middleware"

	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

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
		abstract.ImageExpressions,
	).Scan(&params); err != nil {
		return nil, ctx, err
	}

	quantity := rand.Intn(params.MaxQuantity-params.MinQuantity+1) + params.MinQuantity

	rows, err := sql.Query(`
    SELECT "id", "data"
    FROM public.trainer_image_expressions
    ORDER BY random()
    LIMIT $1`,
		quantity,
	)
	if err != nil {
		return nil, ctx, err
	}
	defer rows.Close()

	var questions []*QuestionConfig
	for rows.Next() {
		config := newConfig(params)
		if err = rows.Scan(&config.Image, &config.Data); err != nil {
			return nil, ctx, err
		}
		configs = append(configs, config)

		question := newQuestionConfig(params)
		question.Image = config.Image
		question.Data = config.Data
		questions = append(questions, question)
	}

	rand.Shuffle(len(configs), func(i, j int) { configs[i], configs[j] = configs[j], configs[i] })

	rand.Shuffle(len(questions), func(i, j int) { questions[i], questions[j] = questions[j], questions[i] })

	for _, question := range questions {
		configs = append(configs, question)
	}

	return configs, ctx, nil
}
