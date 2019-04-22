package trainers

import (
	"math/rand"
	"time"

	"github.com/google/uuid"

	"github.com/wisdman/oitp-isov/api/lib/db"
)

var TablePipeAction = [...]string{"up", "down", "left", "right"}

type TablePipeItem struct {
	Data   string `json:"data"`
	Action string `json:"action"`
}

type TablePipeConfig struct {
	ID        string `json:"id"`
	UID       string `json:"uid"`
	TimeLimit int    `json:"timeLimit"`

	Items []*TablePipeItem `json:"items"`
}

var TABLE_PIPE_ALPHABET_EN = [...]rune{'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'}
var TABLE_PIPE_ALPHABET_RU = [...]rune{'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ы', 'Э', 'Ю', 'Я'}
var TABLE_PIPE_NUMBERS = [...]rune{'1', '2', '3', '4', '5', '6', '7', '8', '9', '0'}

func TablePipeAlphabetEN(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	items := make([]rune, len(TABLE_PIPE_ALPHABET_EN))
	for i := 0; i < len(TABLE_PIPE_ALPHABET_EN); i++ {
		items[i] = TABLE_PIPE_ALPHABET_EN[i]
	}
	config, err := tablePipe(sql, complexity, items)
	if err != nil {
		return nil, err
	}

	configs = append(configs, config)
	return configs, nil
}

func TablePipeAlphabetRU(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	items := make([]rune, len(TABLE_PIPE_ALPHABET_RU))
	for i := 0; i < len(TABLE_PIPE_ALPHABET_RU); i++ {
		items[i] = TABLE_PIPE_ALPHABET_RU[i]
	}
	config, err := tablePipe(sql, complexity, items)
	if err != nil {
		return nil, err
	}

	configs = append(configs, config)
	return configs, nil
}

func TablePipeNumbers(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	items := make([]rune, len(TABLE_PIPE_NUMBERS))
	for i := 0; i < len(TABLE_PIPE_NUMBERS); i++ {
		items[i] = TABLE_PIPE_NUMBERS[i]
	}
	config, err := tablePipe(sql, complexity, items)
	if err != nil {
		return nil, err
	}

	configs = append(configs, config)
	return configs, nil
}

type TablePipeParameters struct {
	Size       int `json:"size"`
	ItemsCount int `json:"itemsCount"`
	TimeLimit  int `json:"timeLimit"`
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
		return nil, err
	}

	rand.Seed(time.Now().UnixNano())
	rand.Shuffle(len(items), func(i, j int) { items[i], items[j] = items[j], items[i] })

	uid, err := uuid.NewUUID()
	if err != nil {
		return nil, err
	}

	config = &TablePipeConfig{
		ID:        "table-pipe",
		UID:       uid.String(),
		TimeLimit: parameters.TimeLimit,
	}

	for i := 0; i < parameters.Size; i++ {
		j := rand.Intn(4)
		config.Items = append(config.Items, &TablePipeItem{
			Data:   getCharSVG(items[j]),
			Action: TablePipeAction[j],
		})
	}

	return config, nil
}
