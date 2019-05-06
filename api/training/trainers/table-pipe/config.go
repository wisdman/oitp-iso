package tablePipe

import (
	"github.com/wisdman/oitp-isov/api/training/trainers"
)

type Parameters struct {
	*trainers.Parameters
	Size uint `json:"size", description:"Размер"`
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

	Items  []*Item  `json:"items"`
	Matrix []uint16 `json:"matrix"`
}

func newConfig(
	param Parameters,
) *Config {
	return &Config{
		Config: trainers.NewConfig(trainers.UITablePipe, param.TimeLimit),
		Items:  make([]*Item, len(actions)),
		Matrix: make([]uint16, param.Size),
	}
}
