package storytelling

import (
	"context"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
)

var complexityStorytellingData = [...]Parameters{
	Parameters{
		PlayTimeLimit: 30,
	},
}

func Build(ctx context.Context) (
	[]interface{},
	context.Context,
	error,
) {
	var configs []interface{}

	sql := middleware.GetDBTransactionFromContext(ctx)
	params := complexityStorytellingData[0]

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
