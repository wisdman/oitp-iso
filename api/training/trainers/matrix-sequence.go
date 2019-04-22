package trainers

import (
	"math/rand"
	"time"

	"github.com/google/uuid"

	"github.com/wisdman/oitp-isov/api/lib/db"
)

type MatrixSequenceConfig struct {
	ID        string `json:"id"`
	UID       string `json:"uid"`
	TimeLimit int    `json:"timeLimit"`

	Matrix []int16 `json:"matrix"`
}

type MatrixSequenceParameters struct {
	Size        int  `json:"size"`
	TimeLimit   int  `json:"timeLimit"`
	ShowSuccess bool `json:"showSuccess"`
}

func MatrixSequence(
	sql *db.Transaction,
	complexity uint8,
	quantity int,
) (
	configs []interface{},
	err error,
) {
	var parameters MatrixSequenceParameters
	if err = GetComplexityConfig(sql, "matrix-sequence", complexity, &parameters); err != nil {
		return nil, err
	}

	rows, err := sql.Query(`
    SELECT
      "data"
    FROM public.trainers_data_patterns
    WHERE
      "type" = 'numbers'
      AND
      array_length("data", 1) = $1
    ORDER BY random()
    LIMIT $2
    `,
		parameters.Size*parameters.Size,
		quantity,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		uid, err := uuid.NewUUID()
		if err != nil {
			return nil, err
		}

		config := &MatrixSequenceConfig{
			ID:        "matrix-sequence",
			UID:       uid.String(),
			TimeLimit: parameters.TimeLimit,
		}

		if err = rows.Scan(&config.Matrix); err != nil {
			return nil, err
		}

		configs = append(configs, config)
	}

	return configs, nil
}

func MatrixRandomSequence(
	sql *db.Transaction,
	complexity uint8,
	quantity int,
) (
	configs []interface{},
	err error,
) {
	rand.Seed(time.Now().UnixNano())

	var parameters MatrixSequenceParameters
	if err = GetComplexityConfig(sql, "matrix-random-sequence", complexity, &parameters); err != nil {
		return nil, err
	}

	for i := 0; i < quantity; i++ {
		uid, err := uuid.NewUUID()
		if err != nil {
			return nil, err
		}

		configs = append(configs, &MatrixSequenceConfig{
			ID:        "matrix-sequence",
			UID:       uid.String(),
			TimeLimit: parameters.TimeLimit,

			Matrix: makeRandomMatrix(parameters.Size),
		})
	}

	return configs, nil
}

func makeRandomMatrix(size int) []int16 {
	matrix := make([]int16, size*size)
	for i := range matrix {
		matrix[i] = int16(i) + 1
	}

	rand.Shuffle(len(matrix), func(i, j int) { matrix[i], matrix[j] = matrix[j], matrix[i] })

	return matrix
}
