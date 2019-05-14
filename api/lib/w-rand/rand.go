package wRand

import (
	"math/rand"
	"time"
)

func Shuffle(n int, swap func(i, j int)) {
	rand.Shuffle(n, swap)
}

func init() {
	rand.Seed(time.Now().UnixNano())
}

func Intn(n int) int {
	return rand.Intn(n)
}

func Range(min int, max int) int {
	return rand.Intn(max-min+1) + min
}

func Multin(n int, count int) []int {
	values := make([]int, count)
	for i := 0; i < count; i++ {
		values[i] = Intn(n)
	}
	return values
}

func MultiRange(min int, max int, count int) []int {
	values := make([]int, count)
	for i := 0; i < count; i++ {
		values[i] = Range(min, max)
	}
	return values
}

type Unique struct {
	generated map[int]bool
}

func NewUnique() *Unique {
	return &Unique{make(map[int]bool)}
}

func (u *Unique) Intn(n int) int {
	for {
		i := rand.Intn(n)
		if !u.generated[i] {
			u.generated[i] = true
			return i
		}
	}
}

func (u *Unique) Range(min int, max int) int {
	for {
		i := rand.Intn(max-min+1) + min
		if !u.generated[i] {
			u.generated[i] = true
			return i
		}
	}
}

func (u *Unique) Multin(n int, count int) []int {
	values := make([]int, count)
	for i := 0; i < count; i++ {
		values[i] = u.Intn(n)
	}
	return values
}

func (u *Unique) MultiRange(min int, max int, count int) []int {
	values := make([]int, count)
	for i := 0; i < count; i++ {
		values[i] = u.Range(min, max)
	}
	return values
}
