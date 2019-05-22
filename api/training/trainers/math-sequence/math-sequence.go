package mathSequence

import (
	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/lib/w-rand"
)

var complexityData = [...]Parameters{
	Parameters{
		PlayTimeLimit: 120,
		Quantity:      2,
	},
	Parameters{
		PlayTimeLimit: 120,
		Quantity:      3,
	},
	Parameters{
		PlayTimeLimit: 60,
		Quantity:      4,
	},
}

func newSequence1() []int {
	A1 := wRand.Range(1, 6)
	B1 := wRand.Range(7, 12)
	C1 := wRand.Range(13, 20)

	incA := wRand.Range(1, 9)
	incB := wRand.Range(1, 9)
	incC := wRand.Range(1, 9)

	A2 := A1 + incA
	B2 := B1 + incB
	C2 := C1 + incC

	A3 := A2 + incA
	B3 := B2 + incB
	C3 := C2 + incC

	A4 := A3 + incA

	return []int{A1, B1, C1, A2, B2, C2, A3, B3, C3, A4}
}

func newSequence2() []int {
	A1 := wRand.Range(10, 20)

	inc := wRand.Range(1, 9)
	dec := wRand.Range(1, 9)

	if inc < dec {
		inc, dec = dec, inc
	}

	A2 := A1 + inc
	A3 := A2 - dec
	A4 := A3 + inc
	A5 := A4 - dec
	A6 := A5 + inc
	A7 := A6 - dec

	B1 := wRand.Range(A2+1, A2+inc)
	B2 := wRand.Range(A4+1, A4+inc)
	B3 := wRand.Range(A6+1, A6+inc)

	return []int{A1, A2, B1, A3, A4, B2, A5, A6, B3, A7}
}

func newSequence3() []int {
	A1 := wRand.Range(10, 20)

	inc := wRand.Range(6, 11)
	dec := wRand.Range(1, 5)

	A2 := A1 + inc
	A3 := A2 - dec
	A4 := A3 + inc
	A5 := A4 - dec
	A6 := A5 + inc
	A7 := A6 - dec
	A8 := A7 - dec

	B1 := wRand.Range(A2+1, A2+inc)
	incB := wRand.Range(6, 11)
	B2 := B1 + incB
	B3 := B2 + incB
	B4 := B3 + incB

	return []int{A1, A2, B1, A3, A4, B2, A5, A6, B3, A7, A8, B4}
}

func Build(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {

	params := complexityData[complexity]

	for i := 0; i < params.Quantity; i++ {
		config := newConfig(params)

		switch t := wRand.Intn(3); t {
		case 0:
			config.Items = newSequence1()
		case 1:
			config.Items = newSequence2()
		case 2:
			config.Items = newSequence3()
		}

		// configs = append(configs, newQuestionConfig(params, config.Items))
		configs = append(configs, config)
	}

	return configs, nil
}
