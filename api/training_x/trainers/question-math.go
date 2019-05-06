package trainers

import (
	"fmt"
	"math/rand"
	"strings"
	"time"

	"github.com/wisdman/oitp-isov/api/lib/db"
)

type QuestionMathParameters struct {
	TimeLimit int `json:"timeLimit"`
}

func QuestionMathSeries(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	rand.Seed(time.Now().UnixNano())
	parameters := &QuestionWasteWordsParameters{120}

	S := rand.Intn(10) + 10
	dA := rand.Intn(10)
	dB := rand.Intn(10)
	dC := rand.Intn(10)

	arr := []int{S}
	for i := 0; i < 10; i = i + 3 {
		a := arr[i] + dA
		b := a - dB
		c := b + dC
		arr = append(arr, a, b, c)
	}

	answer := arr[len(arr)-1]
	arr = arr[:len(arr)-1]

	answers := []int{answer}
	for i := 0; i < 4; i++ {
		n := answers[i]
		answers = append(answers, n+rand.Intn(12)-6)
	}

	config := newQuestionConfig(QuestionItemsType_Text, parameters.TimeLimit)
	config.Data = `<h1>` + strings.Trim(strings.Join(strings.Fields(fmt.Sprint(answers)), ", "), "[]") + `, ???</h1>`

	rand.Shuffle(len(answers), func(i, j int) { answers[i], answers[j] = answers[j], answers[i] })
	for i := 0; i < len(answers); i++ {
		config.Items = append(config.Items, &QuestionItem{
			Data:    fmt.Sprint(answers[i]),
			Correct: answers[i] == answer,
		})
	}

	configs = append(configs, config)
	return configs, nil
}

func QuestionMathMiddle(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	rand.Seed(time.Now().UnixNano())
	parameters := &QuestionWasteWordsParameters{120}

	A := rand.Intn(200) + 100
	B := rand.Intn(200) + 100
	C := rand.Intn(200) + 100
	D := rand.Intn(200) + 100

	answer := sumDigits(C) + sumDigits(D)

	config := newQuestionConfig(QuestionItemsType_Text, parameters.TimeLimit)
	config.Data = fmt.Sprintf("<h1>%d (%d) %d<br>%d (???) %d</h1>", A, sumDigits(A)+sumDigits(B), B, C, D)

	answers := []int{answer}
	for i := 0; i < 4; i++ {
		n := answers[i]
		answers = append(answers, n+rand.Intn(12)-6)
	}

	rand.Shuffle(len(answers), func(i, j int) { answers[i], answers[j] = answers[j], answers[i] })
	for i := 0; i < len(answers); i++ {
		config.Items = append(config.Items, &QuestionItem{
			Data:    fmt.Sprint(answers[i]),
			Correct: answers[i] == answer,
		})
	}

	configs = append(configs, config)
	return configs, nil
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
