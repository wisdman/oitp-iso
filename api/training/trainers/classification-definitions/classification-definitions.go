package classificationDefinitions

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
)

var complexityDefinitionsData = [...]Parameters{
	Parameters{
		TimeLimit: 60,
		MinItems:  4,
		MaxItems:  5,
	},
	Parameters{
		TimeLimit: 60,
		MinItems:  5,
		MaxItems:  6,
	},
	Parameters{
		TimeLimit: 60,
		MinItems:  6,
		MaxItems:  7,
	},
	Parameters{
		TimeLimit: 60,
		MinItems:  7,
		MaxItems:  8,
	},
	Parameters{
		TimeLimit: 60,
		MinItems:  8,
		MaxItems:  9,
	},
	Parameters{
		TimeLimit: 60,
		MinItems:  9,
		MaxItems:  10,
	},
}

func Build(
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
		    	LIMIT public.random_range($1,$2)
		    ) t1
		    ORDER BY random()
		  ) t2
		) t3
		WHERE t3.cnt = 1`,
		params.MinItems,
		params.MaxItems,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	config := newConfig(params)

	for rows.Next() {
		item := &Item{}
		if err = rows.Scan(&item.Definition, &item.Data); err != nil {
			return nil, err
		}
		config.Items = append(config.Items, item)
	}

	configs = append(configs, config)
	return configs, nil
}
