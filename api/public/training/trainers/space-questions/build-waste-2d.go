package spaceQuestions

import (
	"context"
	"encoding/base64"
	"fmt"
	"math"
	"math/rand"

	"github.com/wisdman/oitp-isov/api/lib/middleware"

	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

func BuildWaste2D(ctx context.Context) (
	[]interface{},
	context.Context,
	error,
) {
	var configs []interface{}

	sql := middleware.GetDBTransactionFromContext(ctx)

	var params Parameters
	if err := sql.QueryRow(`
    SELECT "complexity"
    FROM public.self_complexity
    WHERE "trainer" = $1`,
		abstract.SpaceQuestionsWaste2D,
	).Scan(&params); err != nil {
		return nil, ctx, err
	}

	quantity := rand.Intn(params.MaxQuantity-params.MinQuantity+1) + params.MinQuantity

	for i := 0; i < quantity; i++ {

		config := newConfig(abstract.SpaceQuestionsWaste2D, abstract.UISpaceQuestionWaste, params)

		// Genegate shape points
		points := [][]float64{{2, 98}, {2, 2}}
		for j := 0; j < 5; j++ {
			x := 23 + rand.Intn(70)
			y := j * 20
			points = append(points, []float64{float64(x), float64(y)})
		}

		// Genegate shapes with rotate
		itemsCount := rand.Intn(params.MaxItems-params.MinItems+1) + params.MinItems
		for j := 1; j < itemsCount; j++ {
			points = centred2d(rotate2d(points, float64(rand.Intn(180))))

			config.Items = append(config.Items, &Answer{
				Data:    pointsToSVG(points),
				Correct: false,
			})
		}

		// Flip shape
		for j, max := 0, len(points); j < max; j++ {
			points[j][0] = points[j][0] * -1
		}
		points = centred2d(points)

		config.Items = append(config.Items, &Answer{
			Data:    pointsToSVG(points),
			Correct: true,
		})

		rand.Shuffle(len(config.Items), func(j, k int) { config.Items[j], config.Items[k] = config.Items[k], config.Items[j] })

		configs = append(configs, config)
	}

	return configs, ctx, nil
}

func rotate2d(matrix [][]float64, fi float64) [][]float64 {
	for i, max := 0, len(matrix); i < max; i++ {
		x, y := matrix[i][0], matrix[i][1]
		matrix[i][0], matrix[i][1] = x*math.Cos(fi)-y*math.Sin(fi), x*math.Sin(fi)+y*math.Cos(fi)
	}
	return matrix
}

func centred2d(matrix [][]float64) [][]float64 {
	var sumX, sumY float64
	for i, max := 0, len(matrix); i < max; i++ {
		sumX += matrix[i][0]
		sumY += matrix[i][1]
	}

	dx := sumX / float64(len(matrix))
	dy := sumY / float64(len(matrix))

	for i, max := 0, len(matrix); i < max; i++ {
		matrix[i][0], matrix[i][1] = matrix[i][0]-dx, matrix[i][1]-dy
	}

	return matrix
}

func pointsToSVG(points [][]float64) string {
	var str string
	for i, max := 0, len(points); i < max; i++ {
		str = str + fmt.Sprintf("%f,%f ", points[i][0], points[i][1])
	}

	svg := fmt.Sprintf(
		`<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="-60 -60 120 120"><polygon points="%s" style="fill:#aaa;stroke:#333;stroke-width:4"/></svg>`,
		str,
	)

	return "data:image/svg+xml;base64," + base64.StdEncoding.EncodeToString([]byte(svg))
}