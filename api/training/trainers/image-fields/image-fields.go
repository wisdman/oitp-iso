package imageFields

import (
	"math/rand"
	"time"

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
	rand.Seed(time.Now().UnixNano())

	var parameters Parameters
	if err = trainers.QueryParameters(sql, trainers.ImageFields, complexity, &parameters); err != nil {
		return nil, err
	}

	var fieldConfigs []*Config = make([]*Config, int(parameters.Pages))
	var answers []*question.Item

	var iconsCount uint8 = parameters.ExtraItems
	for i, max := 0, len(fieldConfigs); i < max; i++ {
		config := newConfig(parameters)
		iconsCount += uint8(len(config.Items))
		fieldConfigs[i] = config
	}

	icons, err := trainers.QueryIcons(sql, iconsCount)
	if err != nil {
		return nil, err
	}

	for i, length := 0, int(parameters.ExtraItems); i < length; i++ {
		answers = append(answers, &question.Item{
			Data:    icons[i],
			Correct: false,
		})
	}

	offset := int(parameters.ExtraItems)
	for i, maxI := 0, len(fieldConfigs); i < maxI; i++ {
		for j, maxJ := 0, len(fieldConfigs[i].Items); j < maxJ; j++ {
			icon := icons[offset]
			fieldConfigs[i].Items[j] = icon
			answers = append(answers, &question.Item{
				Data:    icon,
				Correct: true,
			})
			offset++
		}
		configs = append(configs, fieldConfigs[i])
	}

	rand.Shuffle(len(answers), func(i, j int) { answers[i], answers[j] = answers[j], answers[i] })

	configs = append(configs, question.NewConfig(
		parameters.TimeLimit,
		"<h1>Отметьте фигуры встретившиеся вам ранее</h1>",
		question.Image,
		true,
		answers[0:parameters.AnswersCoint],
	))

	return configs, nil
}
