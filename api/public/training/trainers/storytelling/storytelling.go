package storytelling

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

	config := newConfig()
	config.Image = rand.Intn(MAX_STORY_ID)
	configs = append(configs, config)

	return configs, nil
}
