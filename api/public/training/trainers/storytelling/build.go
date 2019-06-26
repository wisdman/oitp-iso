package storytelling

import (
	"context"

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
		abstract.Storytelling,
	).Scan(&params); err != nil {
		return nil, ctx, err
	}

	config := newConfig(params)

	var questions []*Question
	if err := sql.QueryRow(`
	   SELECT
	   	"id",
	   	"questions"
	   FROM public.trainer_storytelling
	   ORDER BY random()
	   LIMIT 1`,
	).Scan(&config.Audio, &questions); err != nil {
		return nil, ctx, err
	}

	configs = append(configs, config)

	for i, max := 0, len(questions); i < max; i++ {
		questionConfig := newQuestionConfig(params)
		questionConfig.Data = questions[i].Data
		questionConfig.Correct = questions[i].Correct
		configs = append(configs, questionConfig)
	}

	return configs, ctx, nil
}
