// Расприделение переключаемость и устойчивость внимания
//
// Написать про жесты (свайп)
//

package tablePipe

import (
	"github.com/wisdman/oitp-isov/api/training/trainers/abstract"
)

type Parameters struct {
	TimeLimit  uint16 `json:"timeLimit"`
	MatrixSize uint   `json:"matrixSize"`
}

type IAction string

const (
	actionUp    IAction = "UP"
	actionDown  IAction = "DOWN"
	actionLeft  IAction = "LEFT"
	actionRight IAction = "RIGHT"
)

var actions = [...]IAction{actionUp, actionDown, actionLeft, actionRight}

type Item struct {
	Rune   string  `json:"data"`
	Action IAction `json:"action"`
}

type Config struct {
	*abstract.Config

	TimeLimit uint16 `json:"timeLimit"`

	Items  []*Item  `json:"items"`
	Matrix []uint16 `json:"matrix"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config:    abstract.NewConfig(abstract.UITablePipe),
		Items:     make([]*Item, len(actions)),
		Matrix:    make([]uint16, params.MatrixSize),
		TimeLimit: params.TimeLimit,
	}
}
