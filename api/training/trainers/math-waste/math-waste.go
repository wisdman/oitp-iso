// Арифметико-практическое мышление
// Логика
//
// Найдите число-исключение
//
// !!! Показать логику - кнопка

package mathWaste

import (
	"strconv"

	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/lib/w-rand"

	"github.com/wisdman/oitp-isov/api/training/trainers/question"
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

func newWaste1Item() int {
	A := wRand.Range(1, 9)
	B := wRand.Range(1, 9)
	C := A + B

	X, err := strconv.Atoi(strconv.Itoa(A) + strconv.Itoa(C) + strconv.Itoa(B))
	if err != nil {
		panic(err)
	}
	return X
}

func newWaste1() (result []int) {
	for i := 0; i < 5; i++ {
		result = append(result, newWaste1Item())
	}

	result = append(result, newWaste1Item()+wRand.Range(1, 10))
	return result
}

func newWaste2Item(inc int) int {
	A := wRand.Range(1, 50)
	B := A + inc

	X, err := strconv.Atoi(strconv.Itoa(A) + strconv.Itoa(B))
	if err != nil {
		panic(err)
	}
	return X
}

func newWaste2() (result []int) {
	inc := wRand.Range(1, 49)

	for i := 0; i < 5; i++ {
		result = append(result, newWaste2Item(inc))
	}

	result = append(result, newWaste2Item(inc)-wRand.Range(1, 10))
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

		switch t := wRand.Intn(2); t {
		case 0:
			config.Items = newWaste1()
		case 1:
			config.Items = newWaste2()
		}

		var answers []*question.Item
		for j, max := 0, len(config.Items)-1; j < max; j++ {
			data := strconv.Itoa(config.Items[j])
			answers = append(answers, &question.Item{
				Data:    &data,
				Correct: false,
			})
		}

		data := strconv.Itoa(config.Items[len(config.Items)-1])
		answers = append(answers, &question.Item{
			Data:    &data,
			Correct: true,
		})

		configs = append(configs, newQuestionConfig(params, answers))
		// configs = append(configs, config)
	}

	return configs, nil
}
