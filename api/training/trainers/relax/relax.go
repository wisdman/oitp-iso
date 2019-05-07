package relax

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/lib/unique-rand"
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
    FROM public.trainers_data_texts
    WHERE type = 'relax'
    ORDER BY random()
    LIMIT $1
    `,
		quantity,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	random := uniqueRand.New()

	for rows.Next() {
		config := newConfig()
		if err = rows.Scan(&config.Text); err != nil {
			return nil, err
		}

		config.Image = random.Uint8(1, relaxImagesCount)
		configs = append(configs, config)
	}

	return configs, nil
}
