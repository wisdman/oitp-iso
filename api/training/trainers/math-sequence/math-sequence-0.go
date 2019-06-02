package mathSequence

import (
	"fmt"
	"math/rand"
)

var level_0 = [](func() []*Item){
	// +inc
	func() (Items []*Item) {
		inc := rand.Intn(9) + 1

		next := rand.Intn(9) + 1
		Items = append(Items, &Item{
			Rune: RUNES[0],
			Data: next,
			Act:  "",
		})

		var el string = RUNES[0]

		for i := 1; i < 10; i++ {
			next += inc
			Items = append(Items, &Item{
				Rune: RUNES[i],
				Data: next,
				Act:  fmt.Sprintf("%s+%d", el, inc),
			})

			el = RUNES[i]
		}

		return Items
	},

	// -dec
	func() (Items []*Item) {
		dec := rand.Intn(8) + 1

		next := rand.Intn(10) + 90
		Items = append(Items, &Item{
			Rune: RUNES[0],
			Data: next,
			Act:  "",
		})

		var el string = RUNES[0]

		for i := 1; i < 10; i++ {
			next -= dec
			Items = append(Items, &Item{
				Rune: RUNES[i],
				Data: next,
				Act:  fmt.Sprintf("%s-%d", el, dec),
			})

			el = RUNES[i]
		}

		return Items
	},

	// +inc +inc
	func() (Items []*Item) {
		inc1 := rand.Intn(9) + 1
		inc2 := rand.Intn(9) + 1

		next := rand.Intn(9) + 1
		Items = append(Items, &Item{
			Rune: RUNES[0],
			Data: next,
			Act:  "",
		})

		var el string = RUNES[0]

		for i := 1; i < 10; i = i + 2 {
			next += inc1
			Items = append(Items, &Item{
				Rune: RUNES[i],
				Data: next,
				Act:  fmt.Sprintf("%s+%d", el, inc1),
			})

			el = RUNES[i]

			next += inc2
			Items = append(Items, &Item{
				Rune: RUNES[i+1],
				Data: next,
				Act:  fmt.Sprintf("%s+%d", el, inc2),
			})

			el = RUNES[i+1]
		}

		return Items
	},

	// -dec -dec
	func() (Items []*Item) {
		dec1 := rand.Intn(9) + 1
		dec2 := rand.Intn(9) + 1

		next := rand.Intn(9) + 90
		Items = append(Items, &Item{
			Rune: RUNES[0],
			Data: next,
			Act:  "",
		})

		var el string = RUNES[0]

		for i := 1; i < 10; i = i + 2 {
			next -= dec1
			Items = append(Items, &Item{
				Rune: RUNES[i],
				Data: next,
				Act:  fmt.Sprintf("%s-%d", el, dec1),
			})

			el = RUNES[i]

			next -= dec2
			Items = append(Items, &Item{
				Rune: RUNES[i+1],
				Data: next,
				Act:  fmt.Sprintf("%s-%d", el, dec2),
			})

			el = RUNES[i+1]
		}

		return Items
	},

	// +inc -dec
	func() (Items []*Item) {
		inc := rand.Intn(5) + 5
		dec := rand.Intn(5)

		next := rand.Intn(9) + 1
		Items = append(Items, &Item{
			Rune: RUNES[0],
			Data: next,
			Act:  "",
		})

		var el string = RUNES[0]

		for i := 1; i < 10; i = i + 2 {
			next += inc
			Items = append(Items, &Item{
				Rune: RUNES[i],
				Data: next,
				Act:  fmt.Sprintf("%s+%d", el, inc),
			})

			el = RUNES[i]

			next -= dec
			Items = append(Items, &Item{
				Rune: RUNES[i+1],
				Data: next,
				Act:  fmt.Sprintf("%s-%d", el, dec),
			})

			el = RUNES[i+1]
		}

		return Items
	},

	// -dec +inc
	func() (Items []*Item) {
		inc := rand.Intn(5) + 5
		dec := rand.Intn(5)

		next := rand.Intn(9) + 10
		Items = append(Items, &Item{
			Rune: RUNES[0],
			Data: next,
			Act:  "",
		})

		var el string = RUNES[0]

		for i := 1; i < 10; i = i + 2 {
			next -= dec
			Items = append(Items, &Item{
				Rune: RUNES[i],
				Data: next,
				Act:  fmt.Sprintf("%s-%d", el, dec),
			})

			el = RUNES[i]

			next += inc
			Items = append(Items, &Item{
				Rune: RUNES[i+1],
				Data: next,
				Act:  fmt.Sprintf("%s+%d", el, inc),
			})

			el = RUNES[i+1]
		}

		return Items
	},
}
