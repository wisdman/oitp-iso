package matrixFilling

import (
	"strconv"

	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/lib/w-rand"

	"github.com/wisdman/oitp-isov/api/training/trainers/icons"
	"github.com/wisdman/oitp-isov/api/training/trainers/question"
)

var complexityRandomData = [...]Parameters{
	Parameters{
		ShowTimeLimit:     5,
		PlayTimeLimit:     30,
		QuestionTimeLimit: 30,
		Quantity:          3,
		ItemsSize:         3,
		MatrixSize:        9,
		AnswersCount:      10,
		FakeAnswersCount:  5,
	},
	Parameters{
		ShowTimeLimit:     5,
		PlayTimeLimit:     30,
		QuestionTimeLimit: 30,
		Quantity:          3,
		ItemsSize:         4,
		MatrixSize:        16,
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
}

func BuildRandom(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	params := complexityRandomData[complexity]

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

	offset := params.FakeAnswersCount
	for i := 0; i < params.Quantity; i++ {
		config := newConfig(params)
		itemsCount := len(config.Items)

		for j := 0; j < itemsCount; j++ {
			icon := iconsList[offset]
			config.Items[j] = icon
			answerIcon := strconv.Itoa(icon)
			answers = append(answers, &question.Item{
				Data:    &answerIcon,
				Correct: true,
			})
			offset++
		}

		for j, max := 0, len(config.Matrix); j < max; j++ {
			config.Matrix[j] = uint16(wRand.Intn(itemsCount))
		}

		configs = append(configs, config)
	}

	configs = append(configs, newQuestionConfig(params, answers))

	return configs, nil
}
