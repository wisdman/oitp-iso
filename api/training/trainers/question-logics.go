package trainers

import (
	"encoding/base64"
	"fmt"
	"math"
	"math/rand"
	"time"

	"github.com/wisdman/oitp-isov/api/lib/db"
)

func QuestionLogicsWaste(
	_ *db.Transaction,
	_ uint8,
) (
	configs []interface{},
	err error,
) {
	rand.Seed(time.Now().UnixNano())

	points := [][]float64{
		{2, 98},
		{2, 2},
	}

	for i := 0; i < 5; i++ {
		x := 23 + rand.Intn(70)
		y := i * 20
		points = append(points, []float64{float64(x), float64(y)})
	}

	var answers []*QuestionItem
	for i := 1; i < 5; i++ {
		points := setCenter(rotate(points, float64(rand.Intn(180))))
		answers = append(answers, &QuestionItem{
			Data:    toSVG(points),
			Correct: false,
		})
	}

	for i, max := 0, len(points); i < max; i++ {
		points[i][0] = points[i][0] * -1
	}
	answers = append(answers, &QuestionItem{
		Data:    toSVG(setCenter(points)),
		Correct: true,
	})

	rand.Shuffle(len(answers), func(i, j int) { answers[i], answers[j] = answers[j], answers[i] })

	config := newQuestionConfig(QuestionItemsType_Image, 30)
	config.Data = "<h1>Какая фигура лишняя?</h1>"
	config.Items = answers

	configs = append(configs, config)
	return
}

func toSVG(points [][]float64) string {
	var str string
	for i, max := 0, len(points); i < max; i++ {
		str = str + fmt.Sprintf("%f,%f ", points[i][0], points[i][1])
	}

	svg := fmt.Sprintf(
		`<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="-70 -70 120 120"><polygon points="%s" style="fill:#aaa;stroke:#666;stroke-width:2"/></svg>`,
		str,
	)

	return "data:image/svg+xml;base64," + base64.StdEncoding.EncodeToString([]byte(svg))
}

func rotate(matrix [][]float64, fi float64) [][]float64 {
	for i, max := 0, len(matrix); i < max; i++ {
		x, y := matrix[i][0], matrix[i][1]
		matrix[i][0], matrix[i][1] = x*math.Cos(fi)-y*math.Sin(fi), x*math.Sin(fi)+y*math.Cos(fi)
	}
	return matrix
}

func setCenter(matrix [][]float64) [][]float64 {
	var sumX, sumY float64
	for i, max := 0, len(matrix); i < max; i++ {
		sumX += matrix[i][0]
		sumY += matrix[i][1]
	}

	dx := sumX / float64(len(matrix))
	dy := sumY / float64(len(matrix))

	for i, max := 0, len(matrix); i < max; i++ {
		matrix[i][0], matrix[i][1] = matrix[i][0]-dx-10, matrix[i][1]-dy-10
	}

	return matrix
}
