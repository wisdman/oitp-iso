package textLetters

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
)

var complexityData = [...]Parameters{
	Parameters{
		ShowTimeLimit: 5,
		PlayTimeLimit: 20,

		MaxLength: 6,
		Quantity:  3,
	},
	Parameters{
		ShowTimeLimit: 5,
		PlayTimeLimit: 20,

		MaxLength: 8,
		Quantity:  3,
	},
	Parameters{
		ShowTimeLimit: 5,
		PlayTimeLimit: 20,

		MaxLength: 10,
		Quantity:  3,
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

	rows, err := sql.Query(`
		SELECT
			data
		FROM (
			SELECT
	      data,
	      array_length(regexp_split_to_array(trim(data), E'\\W+'), 1) AS "length"
	    FROM public.trainer_text_letters
		) t
		WHERE t."length" <= $1
		ORDER BY random()
    LIMIT $2
    `,
		params.MaxLength,
		params.Quantity,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		config := newConfig(params)
		if err = rows.Scan(&config.Data); err != nil {
			return nil, err
		}

		configs = append(configs, config)
	}

	return configs, nil
}
