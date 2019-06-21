package icons

import (
	"context"
	"math/rand"
)

const MAX_ICON_ID = 287

type ctxIconsKeyType int

const IconsKey ctxIconsKeyType = 0

func New(ctx context.Context) context.Context {
	randIcons := rand.Perm(MAX_ICON_ID)
	return context.WithValue(ctx, IconsKey, randIcons)
}

func GetIcons(ctx context.Context, count int) ([]int, context.Context) {
	icons, ok := ctx.Value(IconsKey).([]int)
	if !ok {
		panic("Incorrect Icons Context")
	}

	value := icons[:count]
	return value, context.WithValue(ctx, IconsKey, icons[count:])
}
