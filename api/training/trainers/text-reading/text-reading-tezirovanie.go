package textReading

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
)

var complexityTezirovanieData = [...]Parameters{
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

func BuildTezirovanie(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	params := complexityTezirovanieData[complexity]
	config := newConfig(params)

	if err := sql.QueryRow(`
    SELECT
      "data"
    FROM public.trainers_texts
    WHERE "type" = 'tezirovanie'
    ORDER BY random()
    LIMIT 1`,
	).Scan(&config.Data); err != nil {
		return nil, err
	}

	configs = append(configs, config)
	return configs, nil
}
