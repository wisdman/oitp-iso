package storytelling

import (
	"context"
	"math/rand"
)

func Build(ctx context.Context) (
	[]interface{},
	context.Context,
	error,
) {
	var configs []interface{}

	config := newConfig()
	config.Image = rand.Intn(MAX_STORY_ID)
	configs = append(configs, config)

	return configs, ctx, nil
}
