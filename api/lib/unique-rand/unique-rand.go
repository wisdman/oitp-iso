package uniqueRand

import (
	"math/rand"
	"time"
)

type UniqueRand struct {
	generated map[uint8]bool
}

func New() *UniqueRand {
	rand.Seed(time.Now().UnixNano())
	return &UniqueRand{make(map[uint8]bool)}
}

func (u *UniqueRand) Uint8(
	min uint8,
	max uint8,
) uint8 {
	for {
		i := uint8(rand.Intn(int(max-min)) + int(min))
		if !u.generated[i] {

			u.generated[i] = true
			return i
		}
	}
}
