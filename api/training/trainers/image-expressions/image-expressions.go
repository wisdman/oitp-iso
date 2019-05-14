package imageExpressions

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/lib/w-rand"

	"github.com/wisdman/oitp-isov/api/training/trainers/question"
)

var complexityData = [...]Parameters{
	Parameters{
		ShowTimeLimit:     5,
		QuestionTimeLimit: 30,
		Quantity:          3,
	},
	Parameters{
		ShowTimeLimit:     5,
		QuestionTimeLimit: 30,
		Quantity:          5,
	},
	Parameters{
		ShowTimeLimit:     5,
		QuestionTimeLimit: 30,
		Quantity:          7,
	},
}

func Build(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	params := complexityData[complexity]

	rows, err := sql.Query(`
    SELECT "id", "data"
    FROM public.trainers_image_expressions
    ORDER BY random()
    LIMIT $1`,
		params.Quantity,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var questions []*question.Config
	for rows.Next() {
		config := newConfig(params)
		if err = rows.Scan(&config.Image, &config.Data); err != nil {
			return nil, err
		}
		configs = append(configs, config)
		questions = append(questions, newQuestionConfig(params, config.Image, config.Data))
	}

	wRand.Shuffle(len(questions), func(i, j int) { questions[i], questions[j] = questions[j], questions[i] })

	for i, max := 0, len(questions); i < max; i++ {
		configs = append(configs, questions[i])
	}

	return configs, nil
}
