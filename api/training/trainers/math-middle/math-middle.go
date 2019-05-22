package mathMiddle

import (
	"strconv"

	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/lib/w-rand"
)

var complexityData = [...]Parameters{
	Parameters{
		PlayTimeLimit: 120,
		Quantity:      3,
	},
	Parameters{
		PlayTimeLimit: 60,
		Quantity:      4,
	},
	Parameters{
		PlayTimeLimit: 30,
		Quantity:      4,
	},
}

func sumDigits(number int) int {
	remainder := 0
	sumResult := 0
	for number != 0 {
		remainder = number % 10
		sumResult += remainder
		number = number / 10
	}
	return sumResult
}

func recursiveSumDigits(number int) int {
	sumResult := 0
	if number == 0 {
		return 0
	}
	sumResult = number%10 + recursiveSumDigits(number/10)
	return sumResult
}

func recursiveSum(number int) int {
	for {
		number = recursiveSumDigits(number)
		if number/10 == 0 {
			return number
		}
	}
}

func newSum() []int {
	A := wRand.Range(10, 99)
	B := wRand.Range(10, 99)

	sumA := sumDigits(A)
	sumB := sumDigits(B)

	C, err := strconv.Atoi(strconv.Itoa(sumA) + strconv.Itoa(sumB))
	if err != nil {
		panic(err)
	}

	return []int{A, C, B}
}

func newRecursiveSum() []int {
	A := wRand.Range(100, 999)
	B := wRand.Range(100, 999)

	sumA := recursiveSum(A)
	sumB := recursiveSum(B)

	C, err := strconv.Atoi(strconv.Itoa(sumA) + strconv.Itoa(sumB))
	if err != nil {
		panic(err)
	}

	return []int{A, C, B}
}

func newMiddle() []int {
	A := wRand.Range(100, 999)
	B := wRand.Range(100, 999)

	var C int
	if A > B {
		C = A - B
	} else {
		C = B - A
	}

	return []int{A, C, B}
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
			config.Items[0] = newSum()
			config.Items[1] = newSum()
			config.Items[2] = newSum()
		case 1:
			config.Items[0] = newRecursiveSum()
			config.Items[1] = newRecursiveSum()
			config.Items[2] = newRecursiveSum()
		case 2:
			config.Items[0] = newMiddle()
			config.Items[1] = newMiddle()
			config.Items[2] = newMiddle()
		}

		// configs = append(configs, newQuestionConfig(params, config.Items))
		configs = append(configs, config)
	}

	return configs, nil
}
