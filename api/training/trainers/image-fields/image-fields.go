package imageFields

import (
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
	if err = trainers.QueryParameters(sql, trainers.ImageFields, complexity, &params); err != nil {
		return nil, err
	}

	var answers []*question.Item
	var fieldsConfigs []*Config = make([]*Config, params.Quantity)

	var iconsCount int = params.FakeAnswersCount
	for i := 0; i < params.Quantity; i++ {
		fieldsConfigs[i] = newConfig(params)
		iconsCount += len(fieldsConfigs[i].Items)
	}

	icons, err := trainers.QueryIcons(sql, iconsCount)
	if err != nil {
		return nil, err
	}

	for i := 0; i < params.FakeAnswersCount; i++ {
		answers = append(answers, &question.Item{
			Data:    icons[i],
			Correct: false,
		})
	}

	offset := params.FakeAnswersCount
	for i, maxI := 0, len(fieldsConfigs); i < maxI; i++ {
		for j, maxJ := 0, len(fieldsConfigs[i].Items); j < maxJ; j++ {
			icon := icons[offset]
			fieldsConfigs[i].Items[j] = icon
			answers = append(answers, &question.Item{
				Data:    icon,
				Correct: true,
			})
			offset++
		}
		configs = append(configs, fieldsConfigs[i])
	}

	configs = append(configs, newQuestionConfig(params, answers))

	return configs, nil
}
