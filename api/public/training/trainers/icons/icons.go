package icons

import (
	"github.com/wisdman/oitp-isov/api/lib/w-rand"
)

const MAX_ICON_ID = 135

func GetIcons(count int) []int {
	randIcons := wRand.NewUnique()
	return randIcons.Multin(MAX_ICON_ID, count)
}
