package imageFields

import (
	"context"
	"math/rand"

	"github.com/wisdman/oitp-isov/api/lib/middleware"

	"github.com/wisdman/oitp-isov/api/public/training/icons"
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

func Build(ctx context.Context) (
	[]interface{},
	context.Context,
	error,
) {
	var configs []interface{}

	sql := middleware.GetDBTransactionFromContext(ctx)

	var params Parameters
	if err := sql.QueryRow(`
     SELECT "complexity"
     FROM public.self_complexity
     WHERE "trainer" = $1`,
		abstract.ImageFields,
	).Scan(&params); err != nil {
		return nil, ctx, err
	}

	quantity := rand.Intn(params.MaxQuantity-params.MinQuantity+1) + params.MinQuantity

	questionConfig := newQuestionConfig(params)

	icons, ctx := icons.GetIcons(ctx, quantity*params.MaxItems+params.AnswersCount)
	var offset int

	for i := 0; i < quantity; i++ {
		length := rand.Intn(params.MaxItems-params.MinItems+1) + params.MinItems

		config := newConfig(params)
		config.Items = make([]int, length)

		for j := 0; j < length; j++ {
			icon := icons[offset]
			config.Items[j] = icon

			if rand.Intn(2) == 1 { // true or false
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

	rand.Shuffle(len(questionConfig.Items), func(i, j int) {
		questionConfig.Items[i], questionConfig.Items[j] = questionConfig.Items[j], questionConfig.Items[i]
	})

	configs = append(configs, questionConfig)
	return configs, ctx, nil
}
