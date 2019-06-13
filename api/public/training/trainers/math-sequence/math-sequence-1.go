package mathSequence

import (
	"fmt"
	"math/rand"
)

var level_1 = [](func() []*Item){
	// +inc, +inc
	func() (Items []*Item) {
		incA := rand.Intn(9) + 1
		incB := rand.Intn(9) + 1

		nextA := rand.Intn(9) + 1
		Items = append(Items, &Item{
			Rune: RUNES[0],
			Data: nextA,
			Act:  "",
		})

		var elA string = RUNES[0]

		nextB := rand.Intn(9) + 1
		Items = append(Items, &Item{
			Rune: RUNES[1],
			Data: nextB,
			Act:  "",
		})

		var elB string = RUNES[1]

		for i := 2; i < 10; i = i + 2 {
			nextA += incA
			Items = append(Items, &Item{
				Rune: RUNES[i],
				Data: nextA,
				Act:  fmt.Sprintf("%s+%d", elA, incA),
			})

			elA = RUNES[i]

			nextB += incB
			Items = append(Items, &Item{
				Rune: RUNES[i+1],
				Data: nextB,
				Act:  fmt.Sprintf("%s+%d", elB, incB),
			})

			elB = RUNES[i+1]
		}

		return Items
	},

	// -dec, -dec
	func() (Items []*Item) {
		decA := rand.Intn(9) + 1
		decB := rand.Intn(9) + 1

		nextA := rand.Intn(9) + 90
		Items = append(Items, &Item{
			Rune: RUNES[0],
			Data: nextA,
			Act:  "",
		})

		var elA string = RUNES[0]

		nextB := rand.Intn(9) + 90
		Items = append(Items, &Item{
			Rune: RUNES[1],
			Data: nextB,
			Act:  "",
		})

		var elB string = RUNES[1]

		for i := 2; i < 10; i = i + 2 {
			nextA -= decA
			Items = append(Items, &Item{
				Rune: RUNES[i],
				Data: nextA,
				Act:  fmt.Sprintf("%s-%d", elA, decA),
			})

			elA = RUNES[i]

			nextB -= decB
			Items = append(Items, &Item{
				Rune: RUNES[i+1],
				Data: nextB,
				Act:  fmt.Sprintf("%s-%d", elB, decB),
			})

			elB = RUNES[i+1]
		}

		return Items
	},

	// +inc, -dec
	func() (Items []*Item) {
		incA := rand.Intn(9) + 1
		decB := rand.Intn(9) + 1

		nextA := rand.Intn(9) + 1
		Items = append(Items, &Item{
			Rune: RUNES[0],
			Data: nextA,
			Act:  "",
		})

		var elA string = RUNES[0]

		nextB := rand.Intn(9) + 90
		Items = append(Items, &Item{
			Rune: RUNES[1],
			Data: nextB,
			Act:  "",
		})

		var elB string = RUNES[1]

		for i := 2; i < 10; i = i + 2 {
			nextA += incA
			Items = append(Items, &Item{
				Rune: RUNES[i],
				Data: nextA,
				Act:  fmt.Sprintf("%s+%d", elA, incA),
			})

			elA = RUNES[i]

			nextB -= decB
			Items = append(Items, &Item{
				Rune: RUNES[i+1],
				Data: nextB,
				Act:  fmt.Sprintf("%s-%d", elB, decB),
			})

			elB = RUNES[i+1]
		}

		return Items
	},

	// -dec, +inc
	func() (Items []*Item) {
		decA := rand.Intn(9) + 1
		incB := rand.Intn(9) + 1

		nextA := rand.Intn(9) + 90
		Items = append(Items, &Item{
			Rune: RUNES[0],
			Data: nextA,
			Act:  "",
		})

		var elA string = RUNES[0]

		nextB := rand.Intn(9) + 1
		Items = append(Items, &Item{
			Rune: RUNES[1+1],
			Data: nextB,
			Act:  "",
		})

		var elB string = RUNES[1]

		for i := 2; i < 10; i = i + 2 {
			nextA -= decA
			Items = append(Items, &Item{
				Rune: RUNES[i],
				Data: nextA,
				Act:  fmt.Sprintf("%s-%d", elA, decA),
			})

			elA = RUNES[i]

			nextB += incB
			Items = append(Items, &Item{
				Rune: RUNES[i],
				Data: nextB,
				Act:  fmt.Sprintf("%s+%d", elB, incB),
			})

			elB = RUNES[i+1]
		}

		return Items
	},
}
