package trainers

import (
	"math/rand"
	"time"

	"github.com/google/uuid"

	"github.com/wisdman/oitp-isov/api/lib/db"
)

type ImageFieldsConfig struct {
	ID        string `json:"id"`
	UID       string `json:"uid"`
	TimeLimit int    `json:"timeLimit"`

	Items []string `json:"items"`
}

type ImageFieldsParameters struct {
	Pages             int `json:"pages"`
	MinItems          int `json:"minItems"`
	MaxItems          int `json:"maxItems"`
	ExtraItems        int `json:"extraItems"`
	TimeLimit         int `json:"timeLimit"`
	QuestionTimeLimit int `json:"questionTimeLimit"`
	QuestionAnswers   int `json:"questionAnswers"`
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
    LIMIT $1
    `,
		iconsCount+parameters.ExtraItems,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var config *ImageFieldsConfig
	var answers []*QuestionAnswer
	var i, j int
	for rows.Next() {
		var icon string
		if err = rows.Scan(&icon); err != nil {
			return nil, err
		}

		if j < len(pages) {
			if i == 0 {
				uid, err := uuid.NewUUID()
				if err != nil {
					return nil, err
				}

				config = &ImageFieldsConfig{
					ID:        "image-field",
					UID:       uid.String(),
					TimeLimit: parameters.TimeLimit,
				}
			}

			config.Items = append(config.Items, icon)
			i++

			if i >= pages[j] {
				configs = append(configs, config)
				i = 0
				j++
			}
		}

		answers = append(answers, &QuestionAnswer{
			Correct: j < len(pages),
			Data:    icon,
		})
	}

	rand.Shuffle(len(answers), func(i, j int) { answers[i], answers[j] = answers[j], answers[i] })

	uid, err := uuid.NewUUID()
	if err != nil {
		return nil, err
	}

	question := &QuestionConfig{
		ID:        "question",
		UID:       uid.String(),
		Body:      "<h1>Отметьте фигуры встретившиеся вам ранее</h1>",
		TimeLimit: parameters.QuestionTimeLimit,

		Type:   "image",
		Button: "Продолжить",

		Items: answers[0:parameters.QuestionAnswers],
	}

	configs = append(configs, question)
	return configs, nil
}
