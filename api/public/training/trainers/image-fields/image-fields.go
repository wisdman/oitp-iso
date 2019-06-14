package imageFields

import (
	"context"
	"math/rand"

	"github.com/wisdman/oitp-isov/api/public/training/icons"
)

var complexityData = [...]Parameters{
	Parameters{
		ShowTimeLimit: 5,
		PlayTimeLimit: 30,

		Quantity: 3,
		MinItems: 3,
		MaxItems: 4,

		AnswersCount: 10,
	},
	Parameters{
		ShowTimeLimit: 5,
		PlayTimeLimit: 30,

		Quantity: 5,
		MinItems: 3,
		MaxItems: 4,

		AnswersCount: 10,
	},
	Parameters{
		ShowTimeLimit: 5,
		PlayTimeLimit: 30,

		Quantity: 5,
		MinItems: 4,
		MaxItems: 5,

		AnswersCount: 15,
	},
}

func Build(ctx context.Context) (
	[]interface{},
	context.Context,
	error,
) {
	var configs []interface{}

	params := complexityData[0]
	questionConfig := newQuestionConfig(params)

	icons, ctx := icons.GetIcons(ctx, params.Quantity*params.MaxItems+params.AnswersCount)

	var offset int

	for i := 0; i < params.Quantity; i++ {
		length := rand.Intn(params.MaxItems-params.MinItems+1) + params.MinItems

		config := newConfig(params)
		config.Items = make([]int, length)

		for j := 0; j < length; j++ {
			icon := icons[offset]
			config.Items[j] = icon

			if rand.Intn(2) == 1 {
				questionConfig.Items = append(questionConfig.Items, &Answer{
					Icon:    icon,
					Correct: true,
				})
			}

			offset++
		}

		configs = append(configs, config)
	}

	// Generate fake answers
	for i, max := 0, params.AnswersCount-len(questionConfig.Items); i < max; i++ {
		questionConfig.Items = append(questionConfig.Items, &Answer{
			Icon:    icons[offset],
			Correct: false,
		})
		offset++
	}

	configs = append(configs, questionConfig)
	return configs, ctx, nil
}
