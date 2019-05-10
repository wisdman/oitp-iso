package matrixFilling

import (
	"math/rand"

	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/training/trainers"
	"github.com/wisdman/oitp-isov/api/training/trainers/question"
)

func Build(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	var params Parameters
	if err = trainers.QueryParameters(sql, trainers.MatrixFilling, complexity, &params); err != nil {
		return nil, err
	}

	var iconsCount int = params.FakeAnswersCount + params.ItemsSize*params.Quantity
	icons, err := trainers.QueryIcons(sql, iconsCount)
	if err != nil {
		return nil, err
	}

	var answers []*question.Item
	for i := 0; i < params.FakeAnswersCount; i++ {
		answers = append(answers, &question.Item{
			Data:    icons[i],
			Correct: false,
		})
	}

	rows, err := sql.Query(`
    SELECT
      "data"
    FROM public.trainers_data_patterns
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
			icon := icons[offset]
			config.Items[i] = icon
			answers = append(answers, &question.Item{
				Data:    icon,
				Correct: true,
			})
			offset++
		}
		configs = append(configs, config)
	}

	configs = append(configs, newQuestionConfig(params, answers))

	return configs, nil
}

func BuildRandom(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	var params Parameters
	if err = trainers.QueryParameters(sql, trainers.MatrixRandomFilling, complexity, &params); err != nil {
		return nil, err
	}

	var iconsCount int = params.FakeAnswersCount + params.ItemsSize*params.Quantity
	icons, err := trainers.QueryIcons(sql, iconsCount)
	if err != nil {
		return nil, err
	}

	var answers []*question.Item
	for i := 0; i < params.FakeAnswersCount; i++ {
		answers = append(answers, &question.Item{
			Data:    icons[i],
			Correct: false,
		})
	}

	offset := params.FakeAnswersCount
	for i := 0; i < params.Quantity; i++ {
		config := newConfig(params)
		itemsCount := len(config.Items)

		for j := 0; j < itemsCount; j++ {
			icon := icons[offset]
			config.Items[j] = icon
			answers = append(answers, &question.Item{
				Data:    icon,
				Correct: true,
			})
			offset++
		}

		for j, max := 0, len(config.Matrix); j < max; j++ {
			config.Matrix[j] = uint16(rand.Intn(itemsCount))
		}

		configs = append(configs, config)
	}

	configs = append(configs, newQuestionConfig(params, answers))

	return configs, nil
}

func BuildUnique(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	var params Parameters
	if err = trainers.QueryParameters(sql, trainers.MatrixUniqueFilling, complexity, &params); err != nil {
		return nil, err
	}

	// Set unique
	params.ItemsSize = params.MatrixSize

	var iconsCount int = params.FakeAnswersCount + params.ItemsSize*params.Quantity
	icons, err := trainers.QueryIcons(sql, iconsCount)
	if err != nil {
		return nil, err
	}

	var answers []*question.Item
	for i := 0; i < params.FakeAnswersCount; i++ {
		answers = append(answers, &question.Item{
			Data:    icons[i],
			Correct: false,
		})
	}

	offset := params.FakeAnswersCount
	for i := 0; i < params.Quantity; i++ {
		config := newConfig(params)
		itemsCount := len(config.Items)

		for j := 0; j < itemsCount; j++ {
			icon := icons[offset]
			config.Items[j] = icon
			config.Matrix[j] = uint16(j)
			answers = append(answers, &question.Item{
				Data:    icon,
				Correct: true,
			})
			offset++
		}

		configs = append(configs, config)
	}

	configs = append(configs, newQuestionConfig(params, answers))

	return configs, nil
}
