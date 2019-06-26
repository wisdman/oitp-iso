package mathMiddle

import (
	"fmt"
	"math/rand"
)

var complexity_2 = [](func() *Item){

	// ABC ( A+B-C X+Y-Z ) XYZ
	func() *Item {
		A := rand.Intn(8) + 1
		B := rand.Intn(A) + 10 - A
		C := rand.Intn(9) + 1

		if rand.Intn(2) == 1 {
			A, B = B, A
		}

		X := rand.Intn(8) + 1
		Y := rand.Intn(X) + 10 - X
		Z := rand.Intn(9) + 1

		if rand.Intn(2) == 1 {
			X, Y = Y, X
		}

		ABC := A + B - C
		XYZ := X + Y - Z

		L := A*100 + B*10 + C
		R := X*100 + Y*10 + C
		SUM := ABC*1000 + XYZ

		return &Item{
			Data:   []int{L, SUM, R},
			Answer: fmt.Sprintf("%d + %d + %d = %d | %d = %d + %d + %d", A, B, C, ABC, XYZ, X, Y, Z),
		}
	},

	// ABC ( X+Y-Z A+B-C ) XYZ
	func() *Item {
		A := rand.Intn(8) + 1
		B := rand.Intn(A) + 10 - A
		C := rand.Intn(9) + 1

		if rand.Intn(2) == 1 {
			A, B = B, A
		}

		X := rand.Intn(8) + 1
		Y := rand.Intn(X) + 10 - X
		Z := rand.Intn(9) + 1

		if rand.Intn(2) == 1 {
			X, Y = Y, X
		}

		ABC := A + B - C
		XYZ := X + Y - Z

		L := A*100 + B*10 + C
		R := X*100 + Y*10 + C
		SUM := XYZ*1000 + ABC

		return &Item{
			Data:   []int{L, SUM, R},
			Answer: fmt.Sprintf("%d + %d + %d = %d | %d = %d + %d + %d", X, Y, Z, XYZ, ABC, A, B, C),
		}
	},
}
