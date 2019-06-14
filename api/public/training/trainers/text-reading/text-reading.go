package textReading

import (
	"context"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
)

var complexityReadingData = [...]Parameters{
	Parameters{
		PlayTimeLimit: 30,
	},
	Parameters{
		PlayTimeLimit: 30,
	},
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
	params := complexityReadingData[0]
	config := newConfig(params)

	var questions []*Question
	if err := sql.QueryRow(`
	   SELECT
	     "data",
	     "questions"
	   FROM public.trainer_text_reading
	   ORDER BY random()
	   LIMIT 1`,
	).Scan(&config.Data, &questions); err != nil {
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
