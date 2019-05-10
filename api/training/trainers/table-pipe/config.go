package tablePipe

import (
	"github.com/wisdman/oitp-isov/api/training/trainers"
)

type Parameters struct {
	TimeLimit  uint16 `json:"timeLimit", description:"Лимит времени заполнения"`
	MatrixSize uint   `json:"matrixSize", description:"Размер"`
}

type IAction string

const (
	actionUp    IAction = "up"
	actionDown  IAction = "down"
	actionLeft  IAction = "left"
	actionRight IAction = "right"
)

var actions = [...]IAction{actionUp, actionDown, actionLeft, actionRight}

type Item struct {
	Rune   string  `json:"data"`
	Action IAction `json:"action"`
}

type Config struct {
	*trainers.Config

	TimeLimit uint16 `json:"timeLimit"`

	Items  []*Item  `json:"items"`
	Matrix []uint16 `json:"matrix"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config:    trainers.NewConfig(trainers.UITablePipe),
		Items:     make([]*Item, len(actions)),
		Matrix:    make([]uint16, params.MatrixSize),
		TimeLimit: params.TimeLimit,
	}
}
