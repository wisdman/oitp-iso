package matrixFilling

import (
	"strconv"

	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/training/trainers/question"

	"github.com/wisdman/oitp-isov/api/training/trainers/icons"
)

var complexityPatternData = [...]Parameters{
	Parameters{
		ShowTimeLimit:     5,
		PlayTimeLimit:     30,
		QuestionTimeLimit: 30,
		Quantity:          3,
		ItemsSize:         5,
		MatrixSize:        9,
		AnswersCount:      10,
		FakeAnswersCount:  5,
	},
	Parameters{
		ShowTimeLimit:     5,
		PlayTimeLimit:     30,
		QuestionTimeLimit: 30,
		Quantity:          3,
		ItemsSize:         5,
		MatrixSize:        16,
		AnswersCount:      10,
		FakeAnswersCount:  5,
	},
	Parameters{
		ShowTimeLimit:     5,
		PlayTimeLimit:     30,
		QuestionTimeLimit: 30,
		Quantity:          3,
		ItemsSize:         7,
		MatrixSize:        16,
		AnswersCount:      10,
		FakeAnswersCount:  5,
	},
}

func BuildPattern(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	params := complexityPatternData[complexity]

	var iconsCount int = params.FakeAnswersCount + params.ItemsSize*params.Quantity
	iconsList := icons.GetIcons(iconsCount)

	var answers []*question.Item
	for i := 0; i < params.FakeAnswersCount; i++ {
		answerIcon := strconv.Itoa(iconsList[i])
		answers = append(answers, &question.Item{
			Data:    &answerIcon,
			Correct: false,
		})
	}

	rows, err := sql.Query(`
    SELECT
      "data"
    FROM public.trainers_patterns
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
		return nil, err
	}
	defer rows.Close()

	offset := params.FakeAnswersCount
	for rows.Next() {
		config := newConfig(params)
		if err = rows.Scan(&config.Matrix); err != nil {
			return nil, err
		}
		for i, max := 0, len(config.Items); i < max; i++ {
			icon := iconsList[offset]
			config.Items[i] = icon
			answerIcon := strconv.Itoa(icon)
			answers = append(answers, &question.Item{
				Data:    &answerIcon,
				Correct: true,
			})
			offset++
		}
		configs = append(configs, config)
	}

	configs = append(configs, newQuestionConfig(params, answers))

	return configs, nil
}
