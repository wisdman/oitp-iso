package relax

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/lib/w-rand"
)

func Build(
	sql *db.Transaction,
	quantity uint8,
) (
	configs []interface{},
	err error,
) {

	rows, err := sql.Query(`
    SELECT
      data
    FROM public.trainers_texts
    WHERE type = 'relax'
    ORDER BY random()
    LIMIT 1
    `,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	rand := wRand.NewUnique()

	for rows.Next() {
		config := newConfig()
		if err = rows.Scan(&config.Text); err != nil {
			return nil, err
		}
		config.Image = rand.Intn(MAX_RELAX_ID)
		configs = append(configs, config)
	}

	return configs, nil
}
