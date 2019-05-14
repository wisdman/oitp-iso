package mathEquation

import (
	"strconv"

	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/lib/w-rand"
)

var complexityData = [...]Parameters{
	Parameters{
		PlayTimeLimit: 120,
		DigitsCount:   4,
		UniqueDigits:  1,
		Quantity:      3,
	},
	Parameters{
		PlayTimeLimit: 120,
		DigitsCount:   4,
		UniqueDigits:  2,
		Quantity:      3,
	},
	Parameters{
		PlayTimeLimit: 120,
		DigitsCount:   5,
		UniqueDigits:  2,
		Quantity:      3,
	},
}

func newEquation(params Parameters) (result string) {
	rand := wRand.NewUnique()
	digits := rand.MultiRange(1, 9, params.UniqueDigits)
	digitsLen := len(digits)
	for i := 0; i < params.DigitsCount; i++ {
		if i > 0 {
			operation := operations[wRand.Intn(operationsLen)]
			result += string(operation)
		}
		digit := strconv.Itoa(digits[wRand.Intn(digitsLen)])
		result += string(digit)
	}

	return result
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
		config.Equation = newEquation(params)
		configs = append(configs, config)
	}

	return configs, nil
}
