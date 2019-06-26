package mathWaste

import (
	"math/rand"
)

var complexity_0 = [](func() []int){

	// even 2 digit
	func() []int {
		var Data []int
		var X int

		generated := make(map[int]bool)

		for i := 0; i < 11; i++ {
			for {
				X = rand.Intn(89) + 10
				if X%2 != 0 {
					X++
				}
				if !generated[X] {
					generated[X] = true
					break
				}
			}
			Data = append(Data, X)
		}

		X = rand.Intn(89) + 10
		if X%2 == 0 {
			X++
		}
		Data = append(Data, X)

		return Data
	},

	// odd 2 digit
	func() []int {
		var Data []int
		var X int

		generated := make(map[int]bool)

		for i := 0; i < 11; i++ {
			for {
				X = rand.Intn(89) + 10
				if X%2 == 0 {
					X++
				}
				if !generated[X] {
					generated[X] = true
					break
				}
			}
			Data = append(Data, X)
		}

		X = rand.Intn(89) + 10
		if X%2 != 0 {
			X++
		}
		Data = append(Data, X)

		return Data
	},
}
