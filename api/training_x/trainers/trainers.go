package trainers

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
)

type Trainer int

const (
	TrainerClassificationColors = iota
	TrainerClassificationWords
	TrainerTablePipe
)

var trainerDBID = map[uint]string{
	TrainerClassificationColors: "classification-colors",
	TrainerClassificationWords:  "classification-words",
	TrainerTablePipe:            "table-pipe",
}

type Parameters struct {
	TimeLimit uint `json:"timeLimit"`
}

func GetParameters(
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
