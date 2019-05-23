// Скорость зрительного восприятия
// Запомните картинки
// Восстановите картинки по памяти

package imageFields

import (
	"strconv"

	"github.com/wisdman/oitp-isov/api/lib/db"

	"github.com/wisdman/oitp-isov/api/training/trainers/icons"
	"github.com/wisdman/oitp-isov/api/training/trainers/question"
)

var complexityData = [...]Parameters{
	Parameters{
		ShowTimeLimit:     5,
		QuestionTimeLimit: 30,
		MinItems:          3,
		MaxItems:          4,
		AnswersCount:      10,
		FakeAnswersCount:  5,
		Quantity:          3,
	},
	Parameters{
		ShowTimeLimit:     5,
		QuestionTimeLimit: 30,
		MinItems:          4,
		MaxItems:          5,
		AnswersCount:      10,
		FakeAnswersCount:  5,
		Quantity:          3,
	},
	Parameters{
		ShowTimeLimit:     5,
		QuestionTimeLimit: 30,
		MinItems:          4,
		MaxItems:          5,
		AnswersCount:      10,
		FakeAnswersCount:  5,
		Quantity:          5,
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

	var answers []*question.Item
	var fieldsConfigs []*Config = make([]*Config, params.Quantity)

	var iconsCount int = params.FakeAnswersCount
	for i := 0; i < params.Quantity; i++ {
		fieldsConfigs[i] = newConfig(params)
		iconsCount += len(fieldsConfigs[i].Items)
	}

	iconsList := icons.GetIcons(iconsCount)

	for i := 0; i < params.FakeAnswersCount; i++ {
		answerIcon := strconv.Itoa(iconsList[i])
		answers = append(answers, &question.Item{
			Data:    &answerIcon,
			Correct: false,
		})
	}

	offset := params.FakeAnswersCount
	for i, maxI := 0, len(fieldsConfigs); i < maxI; i++ {
		for j, maxJ := 0, len(fieldsConfigs[i].Items); j < maxJ; j++ {
			icon := iconsList[offset]
			fieldsConfigs[i].Items[j] = icon
			answerIcon := strconv.Itoa(icon)
			answers = append(answers, &question.Item{
				Data:    &answerIcon,
				Correct: true,
			})
			offset++
		}
		configs = append(configs, fieldsConfigs[i])
	}

	configs = append(configs, newQuestionConfig(params, answers))

	return configs, nil
}
