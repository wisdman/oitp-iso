package imageExpressions

import (
	"context"
	"math/rand"

	"github.com/wisdman/oitp-isov/api/lib/middleware"
)

var complexityData = [...]Parameters{
	Parameters{
		ShowTimeLimit: 5,
		PlayTimeLimit: 30,
		MinItems:      3,
		MaxItems:      5,
	},
	Parameters{
		ShowTimeLimit: 5,
		PlayTimeLimit: 30,
		MinItems:      5,
		MaxItems:      7,
	},
	Parameters{
		ShowTimeLimit: 5,
		PlayTimeLimit: 30,
		MinItems:      7,
		MaxItems:      9,
	},
	Parameters{
		ShowTimeLimit: 4,
		PlayTimeLimit: 30,
		MinItems:      7,
		MaxItems:      9,
	},
	Parameters{
		ShowTimeLimit: 3,
		PlayTimeLimit: 30,
		MinItems:      7,
		MaxItems:      9,
	},
	Parameters{
		ShowTimeLimit: 2,
		PlayTimeLimit: 30,
		MinItems:      7,
		MaxItems:      9,
	},
}

func Build(ctx context.Context) (
	[]interface{},
	context.Context,
	error,
) {
	var configs []interface{}

	sql := middleware.GetDBTransactionFromContext(ctx)
	params := complexityData[0]

	rows, err := sql.Query(`
    SELECT "id", "data"
    FROM public.trainer_image_expressions
    ORDER BY random()
    LIMIT public.random_in_range($1,$2)`,
		params.MinItems,
		params.MaxItems,
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
