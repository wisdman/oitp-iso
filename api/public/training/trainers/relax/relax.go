package relax

import (
	"math/rand"

	"github.com/wisdman/oitp-isov/api/lib/db"
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
    FROM public.trainer_relax
    ORDER BY random()
    LIMIT 1
    `,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		config := newConfig()
		if err = rows.Scan(&config.Text); err != nil {
			return nil, err
		}
		config.Image = rand.Intn(MAX_RELAX_ID + 1)
		configs = append(configs, config)
	}

	return configs, nil
}
