package mathEquation

import (
	"context"
	"math/rand"
	"strconv"
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

func multiRange(min int, max int, count int) []int {
	values := make([]int, count)
	for i := 0; i < count; i++ {
		values[i] = rand.Intn(max-min+1) + min
	}
	return values
}

func newEquation(params Parameters) (result string) {
	digits := multiRange(1, 9, params.UniqueDigits)
	digitsLen := len(digits)
	for i := 0; i < params.DigitsCount; i++ {
		if i > 0 {
			operation := operations[rand.Intn(operationsLen)]
			result += string(operation)
		}
		digit := strconv.Itoa(digits[rand.Intn(digitsLen)])
		result += string(digit)
	}

	return result
}

func Build(ctx context.Context) (
	[]interface{},
	context.Context,
	error,
) {
	var configs []interface{}

	params := complexityData[0]

	for i := 0; i < params.Quantity; i++ {
		config := newConfig(params)
		config.Equation = newEquation(params)
		configs = append(configs, config)
	}

	return configs, ctx, nil
}
