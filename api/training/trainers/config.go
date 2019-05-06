package trainers

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/lib/uuid"
)

type Parameters struct {
	TimeLimit uint16 `json:"timeLimit", description:"Лимит времени"`
}

func QueryParameters(
	sql *db.Transaction,
	trainer ITrainer,
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
		string(trainer),
		complexity,
	).Scan(config)
	return err
}

type Config struct {
	ID        IUITrainer `json:"id"`
	UID       uuid.UID   `json:"uid"`
	TimeLimit uint16     `json:"timeLimit"`
}

func NewConfig(
	id IUITrainer,
	timeLimit uint16,
) *Config {
	return &Config{
		ID:        id,
		UID:       uuid.UUID(),
		TimeLimit: timeLimit,
	}
}
