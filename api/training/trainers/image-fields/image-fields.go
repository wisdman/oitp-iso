package imageFields

import (
	"math/rand"

	"github.com/wisdman/oitp-isov/api/lib/db"

	"github.com/wisdman/oitp-isov/api/training/trainers/icons"
)

var complexityData = [...]Parameters{
	Parameters{
		ShowTimeLimit: 5,
		PlayTimeLimit: 30,

		PagesCount: 3,
		MinItems:   3,
		MaxItems:   4,

		AnswersCount: 10,
	},
	Parameters{
		ShowTimeLimit: 5,
		PlayTimeLimit: 30,

		PagesCount: 5,
		MinItems:   3,
		MaxItems:   4,

		AnswersCount: 10,
	},
	Parameters{
		ShowTimeLimit: 5,
		PlayTimeLimit: 30,

		PagesCount: 5,
		MinItems:   4,
		MaxItems:   5,

		AnswersCount: 15,
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
	config := newConfig(params)
	icons := icons.GetIcons(params.PagesCount*params.MaxItems + params.AnswersCount)
	var offset int

	// Generate pages
	for i, max := 0, len(config.Pages); i < max; i++ {
		length := rand.Intn(params.MaxItems-params.MinItems+1) + params.MinItems

		config.Pages[i] = make([]int, length)

		for j := 0; j < length; j++ {
			icon := icons[offset]
			config.Pages[i][j] = icon

			if rand.Intn(2) == 1 {
				config.Answers = append(config.Answers, &Answer{
					Icon:    icon,
					Correct: true,
				})
			}

			offset++
		}
	}

	// Generate fake answers
	for i, max := 0, params.AnswersCount-len(config.Answers); i < max; i++ {
		config.Answers = append(config.Answers, &Answer{
			Icon:    icons[offset],
			Correct: false,
		})

		offset++
	}

	rand.Shuffle(len(config.Answers), func(i, j int) {
		config.Answers[i], config.Answers[j] = config.Answers[j], config.Answers[i]
	})

	configs = append(configs, config)
	return configs, nil
}
