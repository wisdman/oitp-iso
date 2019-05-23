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
		ShowTimeLimit:     60,
		QuestionTimeLimit: 30,
	},
	Parameters{
		ShowTimeLimit:     50,
		QuestionTimeLimit: 30,
	},
	Parameters{
		ShowTimeLimit:     40,
		QuestionTimeLimit: 30,
	},
}

func BuildReading(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	// params := complexityReadingData[complexity]
	// config := newConfig(params)

	// var questions []*QuestionConfig
	// if err := sql.QueryRow(`
	//    SELECT
	//      "data",
	//      "questions"
	//    FROM public.trainers_texts
	//    WHERE "type" = 'reading'
	//    ORDER BY random()
	//    LIMIT 1`,
	// ).Scan(&config.Data, &questions); err != nil {
	// 	return nil, err
	// }

	return configs, nil
}
