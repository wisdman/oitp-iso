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

	if err := sql.QueryRow(`
	   SELECT
	     "data"
	   FROM public.trainers_texts
	   WHERE "type" = 'reading'
	   ORDER BY random()
	   LIMIT 1`,
	).Scan(&config.Data); err != nil {
		return nil, err
	}

	configs = append(configs, config)
	return configs, nil
}
