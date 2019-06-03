// Точность восприятия - тексты
//
// Прочтите текст
//

package textReading

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
)

var complexityReadingData = [...]Parameters{
	Parameters{
		PlayTimeLimit: 30,
	},
	Parameters{
		PlayTimeLimit: 30,
	},
	Parameters{
		PlayTimeLimit: 30,
	},
}

func Build(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	params := complexityReadingData[complexity]
	config := newConfig(params)

	var questions []*Question
	if err := sql.QueryRow(`
	   SELECT
	     "data",
	     "questions"
	   FROM public.trainers_text_reading
	   ORDER BY random()
	   LIMIT 1`,
	).Scan(&config.Data, &questions); err != nil {
		return nil, err
	}

	configs = append(configs, config)

	for i, max := 0, len(questions); i < max; i++ {
		questionConfig := newQuestionConfig(params)
		questionConfig.Data = questions[i].Data
		questionConfig.Correct = questions[i].Correct
		configs = append(configs, questionConfig)
	}

	return configs, nil
}
