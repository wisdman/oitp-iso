package textTezirovanie

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
)

var complexityTezirovanieData = [...]Parameters{
	Parameters{
		PlayTimeLimit: 120,
	},
	Parameters{
		PlayTimeLimit: 60,
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
	params := complexityTezirovanieData[complexity]
	config := newConfig(params)

	if err := sql.QueryRow(`
    SELECT
      "data"
    FROM public.trainer_text_tezirovanie
    ORDER BY random()
    LIMIT 1`,
	).Scan(&config.Data); err != nil {
		return nil, err
	}

	configs = append(configs, config)
	return configs, nil
}
