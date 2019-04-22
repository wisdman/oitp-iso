package trainers

import (
	"github.com/google/uuid"

	"github.com/wisdman/oitp-isov/api/lib/db"
)

type MatrixFillingConfig struct {
	ID        string `json:"id"`
	UID       string `json:"uid"`
	TimeLimit int    `json:"timeLimit"`
	Mode      string `json:"mode"`

	Items  []string `json:"items"`
	Matrix []int16  `json:"matrix"`
}

type MatrixFillingParameters struct {
	Size          int `json:"size"`
	ShowTimeLimit int `json:"showTimeLimit"`
	PlayTimeLimit int `json:"playTimeLimit"`
}

func MatrixFillingIcons(
	sql *db.Transaction,
	complexity uint8,
	quantity int,
) (
	configs []interface{},
	err error,
) {
	var parameters MatrixFillingParameters
	if err = GetComplexityConfig(sql, "matrix-filling", complexity, &parameters); err != nil {
		return nil, err
	}

	var icons []string
	if err := sql.QueryRow(`
		SELECT
			array_agg(i."data") AS "icons"
		FROM (
			SELECT
				'data:image/svg+xml;base64,' || encode("data"::bytea, 'base64') AS "data"
			FROM public.trainers_data_icons
			ORDER BY random()
			LIMIT $1
		) i
		`,
		quantity*7,
	).Scan(&icons); err != nil {
		return nil, err
	}

	rows, err := sql.Query(`
    SELECT
      "data",
      (SELECT count(distinct a)::int FROM unnest("data") a) AS "length"
    FROM public.trainers_data_patterns
    WHERE
      "type" = 'images'
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

		showConfig := &MatrixFillingConfig{
			ID:        "matrix-filling",
			UID:       uid.String(),
			TimeLimit: parameters.ShowTimeLimit,
			Mode:      "show",
		}

		var l int
		if err = rows.Scan(&showConfig.Matrix, &l); err != nil {
			return nil, err
		}

		showConfig.Items = icons[0:l]
		icons = icons[l:]

		uid, err = uuid.NewUUID()
		if err != nil {
			return nil, err
		}

		playConfig := &MatrixFillingConfig{
			ID:        "matrix-filling",
			UID:       uid.String(),
			TimeLimit: parameters.PlayTimeLimit,
			Mode:      "play",
			Matrix:    showConfig.Matrix,
			Items:     showConfig.Items,
		}

		configs = append(configs, showConfig, playConfig)
	}

	return configs, nil
}

func MatrixFillingUnique(
	sql *db.Transaction,
	complexity uint8,
	quantity int,
) (
	configs []interface{},
	err error,
) {
	var parameters MatrixFillingParameters
	if err = GetComplexityConfig(sql, "matrix-filling", complexity, &parameters); err != nil {
		return nil, err
	}

	size := parameters.Size * parameters.Size

	var icons []string
	if err := sql.QueryRow(`
		SELECT
			array_agg(i."data") AS "icons"
		FROM (
			SELECT
				"data"
			FROM public.trainers_data_icons
			LIMIT $1
		) i
		`,
		quantity*size,
	).Scan(&icons); err != nil {
		return nil, err
	}

	matrix := make([]int16, size)
	for i := range matrix {
		matrix[i] = int16(i)
	}

	for i := 0; i < quantity; i++ {
		uid, err := uuid.NewUUID()
		if err != nil {
			return nil, err
		}

		showConfig := &MatrixFillingConfig{
			ID:        "matrix-filling",
			UID:       uid.String(),
			TimeLimit: parameters.ShowTimeLimit,
			Mode:      "show",
			Matrix:    matrix,
			Items:     icons[0:size],
		}

		uid, err = uuid.NewUUID()
		if err != nil {
			return nil, err
		}

		playConfig := &MatrixFillingConfig{
			ID:        "matrix-filling",
			UID:       uid.String(),
			TimeLimit: parameters.PlayTimeLimit,
			Mode:      "play",
			Matrix:    showConfig.Matrix,
			Items:     showConfig.Items,
		}

		configs = append(configs, showConfig, playConfig)

		icons = icons[size:]
	}

	return configs, nil
}
