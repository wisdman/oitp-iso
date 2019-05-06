package trainers

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
)

func GetComplexityConfig(
	sql *db.Transaction,
	trainerID string,
	complexity uint8,
	config interface{},
) (err error) {
	err = sql.QueryRow(`
      SELECT
        "config"
      FROM public.trainers_complexity_configs
      WHERE
        "trainer" = $1
        AND
        "complexity" = $2
      LIMIT 1
    `,
		trainerID,
		complexity,
	).Scan(config)
	return err
}
