package trainers

import (
	"math/rand"
	"time"

	"github.com/wisdman/oitp-isov/api/lib/db"
	"github.com/wisdman/oitp-isov/api/lib/svg"
	"github.com/wisdman/oitp-isov/api/lib/uuid"
)

// var TablePipeActions = [...]string{"up", "down", "left", "right"}
var TablePipeActions = [...]string{"down", "left", "right"}

type TablePipeParameters struct {
	Size       int `json:"size"`
	ItemsCount int `json:"itemsCount"`
	TimeLimit  int `json:"timeLimit"`
}

type TablePipeItem struct {
	Data   string `json:"data"`
	Action string `json:"action"`
}

type TablePipeConfig struct {
	ID        string `json:"id"`
	UID       string `json:"uid"`
	TimeLimit uint16 `json:"timeLimit"`

	Items  []*TablePipeItem `json:"items"`
	Matrix []uint16         `json:"matrix"`
}

func newTablePipeConfig(timeLimit uint16) *TablePipeConfig {
	return &TablePipeConfig{
		ID:        "table-pipe",
		UID:       uuid.UUID(),
		TimeLimit: timeLimit,

		Items:  make([]*TablePipeItem, len(TablePipeActions)),
		Matrix: []uint16{},
	}
}

func TablePipeEN(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	length := len(ARR_ALPHABET_EN)
	items := make([]rune, length)
	for i := 0; i < length; i++ {
		items[i] = ARR_ALPHABET_EN[i]
	}

	if config, err := tablePipe(sql, complexity, items); err == nil {
		return append(configs, config), nil
	}
	return nil, err
}

func TablePipeRU(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	length := len(ARR_ALPHABET_RU)
	items := make([]rune, length)
	for i := 0; i < length; i++ {
		items[i] = ARR_ALPHABET_RU[i]
	}

	if config, err := tablePipe(sql, complexity, items); err == nil {
		return append(configs, config), nil
	}
	return nil, err
}

func TablePipeNumbers(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	length := len(ARR_NUMBERS_AS_RUNE)
	items := make([]rune, length)
	for i := 0; i < length; i++ {
		items[i] = ARR_NUMBERS_AS_RUNE[i]
	}

	if config, err := tablePipe(sql, complexity, items); err == nil {
		return append(configs, config), nil
	}
	return nil, err
}

func tablePipe(
	sql *db.Transaction,
	complexity uint8,
	items []rune,
) (
	config *TablePipeConfig,
	err error,
) {
	var parameters TablePipeParameters
	if err = GetComplexityConfig(sql, "table-pipe", complexity, &parameters); err != nil {
		return
	}

	rand.Seed(time.Now().UnixNano())
	rand.Shuffle(len(items), func(i, j int) { items[i], items[j] = items[j], items[i] })

	config = newTablePipeConfig(uint16(parameters.TimeLimit))

	for i, max := 0, len(TablePipeActions); i < max; i++ {
		j := rand.Intn(max)
		data := svg.RuneSVG(items[j])
		config.Items[i] = &TablePipeItem{
			Data:   data.Base64(),
			Action: TablePipeActions[j],
		}
	}

	for i := 0; i < parameters.Size; i++ {
		j := rand.Intn(len(config.Items))
		config.Matrix = append(config.Matrix, uint16(j))
	}

	return config, nil
}
