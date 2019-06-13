package mathMiddle

import (
	"fmt"
	"math/rand"
)

var level_0 = [](func() *Item){

	// A ( AB ) B
	func() *Item {
		A := rand.Intn(9) + 1
		B := rand.Intn(9) + 1

		SUM := A*10 + B

		return &Item{
			Data:   []int{A, SUM, B},
			Answer: fmt.Sprintf("%d = %d|%d = %d", A, A, B, B),
		}
	},

	// A ( BA ) B
	func() *Item {
		A := rand.Intn(9) + 1
		B := rand.Intn(9) + 1

		SUM := B*10 + A

		return &Item{
			Data:   []int{A, SUM, B},
			Answer: fmt.Sprintf("%d = %d|%d = %d", B, B, A, A),
		}
	},

	// A ( A+B ) B
	func() *Item {
		A := rand.Intn(9) + 1
		B := rand.Intn(9) + 1

		SUM := A + B

		return &Item{
			Data:   []int{A, SUM, B},
			Answer: fmt.Sprintf("%d = %d + %d", SUM, A, B),
		}
	},

	// A ( A-B ) B
	func() *Item {
		A := rand.Intn(999) + 1
		B := rand.Intn(999) + 1

		if B > A {
			A, B = B, A
		}

		SUM := A - B

		return &Item{
			Data:   []int{A, SUM, B},
			Answer: fmt.Sprintf("%d = %d - %d", SUM, A, B),
		}
	},

	// A ( B-A ) B
	func() *Item {
		A := rand.Intn(999) + 1
		B := rand.Intn(999) + 1

		if A > B {
			A, B = B, A
		}

		SUM := B - A

		return &Item{
			Data:   []int{A, SUM, B},
			Answer: fmt.Sprintf("%d = %d - %d", SUM, B, A),
		}
	},

	// AB ( A+B+X+Y ) XY
	func() *Item {
		A := rand.Intn(8) + 1
		B := rand.Intn(A) + 10 - A

		if rand.Intn(2) == 1 {
			A, B = B, A
		}

		X := rand.Intn(8) + 1
		Y := rand.Intn(X) + 10 - X

		if rand.Intn(2) == 1 {
			X, Y = Y, X
		}

		L := A*10 + B
		R := X*10 + Y
		SUM := A + B + X + Y

		return &Item{
			Data:   []int{L, SUM, R},
			Answer: fmt.Sprintf("%d = %d + %d + %d + %d", SUM, A, B, X, Y),
		}
	},

	// ABC ( A+B+C+X+Y+Z ) XYZ
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

		L := A*100 + B*10 + C
		R := X*100 + Y*10 + Z
		SUM := A + B + C + X + Y + Z

		return &Item{
			Data:   []int{L, SUM, R},
			Answer: fmt.Sprintf("%d = %d + %d +%d + %d + %d +%d", SUM, A, B, C, X, Y, Z),
		}
	},
}
