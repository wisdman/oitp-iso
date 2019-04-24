package trainers

import (
	"math/rand"
	"time"

	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/lib/uuid"
)

type ImageFieldsParameters struct {
	Pages             int `json:"pages"`
	MinItems          int `json:"minItems"`
	MaxItems          int `json:"maxItems"`
	ExtraItems        int `json:"extraItems"`
	TimeLimit         int `json:"timeLimit"`
	QuestionTimeLimit int `json:"questionTimeLimit"`
	QuestionAnswers   int `json:"questionAnswers"`
}

type ImageFieldConfig struct {
	ID        string `json:"id"`
	UID       string `json:"uid"`
	TimeLimit uint16 `json:"timeLimit"`

	Items []string `json:"items"`
}

func newImageFieldConfig(timeLimit uint16) *ImageFieldConfig {
	return &ImageFieldConfig{
		ID:        "image-field",
		UID:       uuid.UUID(),
		TimeLimit: timeLimit,
	}
}

func ImageFields(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	rand.Seed(time.Now().UnixNano())

	var parameters ImageFieldsParameters
	if err = GetComplexityConfig(sql, "image-fields", complexity, &parameters); err != nil {
		return nil, err
	}

	// Generate pages and count items
	var pages []int
	var iconsCount int
	for i := 0; i < parameters.Pages; i++ {
		j := rand.Intn(parameters.MaxItems-parameters.MinItems+1) + parameters.MinItems
		iconsCount += j
		pages = append(pages, j)
	}

	rows, err := sql.Query(`
    SELECT
      'data:image/svg+xml;base64,' || encode("data"::bytea, 'base64') AS "data"
    FROM public.trainers_data_icons
    ORDER BY random()
    LIMIT $1
    `,
		iconsCount+parameters.ExtraItems,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var config *ImageFieldConfig
	var answers []*QuestionItem
	var i, j int
	for rows.Next() {
		var icon string
		if err = rows.Scan(&icon); err != nil {
			return nil, err
		}

		if j < len(pages) {
			if i == 0 {
				config = newImageFieldConfig(uint16(parameters.TimeLimit))
			}

			config.Items = append(config.Items, icon)
			i++

			if i >= pages[j] {
				configs = append(configs, config)
				i = 0
				j++
			}
		}

		answers = append(answers, &QuestionItem{
			Data:    icon,
			Correct: j < len(pages),
		})
	}

	rand.Shuffle(len(answers), func(i, j int) { answers[i], answers[j] = answers[j], answers[i] })

	question := newQuestionConfig(QuestionItemsType_Image, parameters.QuestionTimeLimit)

	question.Data = "<h1>Отметьте фигуры встретившиеся вам ранее</h1>"
	question.Button = "Продолжить"
	question.Items = answers[0:parameters.QuestionAnswers]
	question.Multiple = true

	configs = append(configs, question)
	return configs, nil
}
