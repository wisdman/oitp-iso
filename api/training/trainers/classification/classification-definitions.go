package classification

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
)

var complexityDefinitionsData = [...]Parameters{
	Parameters{
		ItemTimeLimit: 10,
		Quantity:      6,
	},
	Parameters{
		ItemTimeLimit: 10,
		Quantity:      8,
	},
	Parameters{
		ItemTimeLimit: 8,
		Quantity:      8,
	},
}

func BuildDefinitions(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	params := complexityDefinitionsData[complexity]

	rows, err := sql.Query(`
		SELECT
      "definition",
      "word"
    FROM(
			SELECT
	      *,
	      ROW_NUMBER() OVER (PARTITION BY "word" ORDER BY random()) AS cnt
			FROM(
		    SELECT
		    	unnest("definitions") AS "definition",
		    	"word"
		    FROM (
		    	SELECT "definitions", "word"
		    	FROM public.trainers_lexicon
		    	WHERE array_length("definitions", 1) > 0
		    	ORDER BY random()
		    	LIMIT $1
		    ) t1
		    ORDER BY random()
		  ) t2
		) t3
		WHERE t3.cnt = 1`,
		params.Quantity,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	config := newConfig(params, TypeTexts)

	for rows.Next() {
		item := &Item{}
		if err = rows.Scan(&item.Data, &item.Group); err != nil {
			return nil, err
		}
		config.Items = append(config.Items, item)
	}

	configs = append(configs, config)
	return configs, nil
}
