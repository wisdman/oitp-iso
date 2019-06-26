package tablePipe

import (
	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

type Parameters struct {
	UUID abstract.UUID `json:"uuid"`

	PlayTimeLimit uint16 `json:"playTimeLimit"`
	MatrixSize    uint   `json:"matrixSize"`

	Quantity int `json:"quantity"`
}

type Adjustment struct {
	PlayTimeLimit uint16 `json:"playTimeLimit"`

	MatrixSize uint `json:"matrixSize"`
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

	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Items  []*Item  `json:"items"`
	Matrix []uint16 `json:"matrix"`
}

func newConfig(
	id abstract.ITrainer,
	params Parameters,
) *Config {
	return &Config{
		Config: abstract.NewConfig(id, abstract.UITablePipe, params.UUID),

		PlayTimeLimit: params.PlayTimeLimit,

		Items:  make([]*Item, len(actions)),
		Matrix: make([]uint16, params.MatrixSize),
	}
}
