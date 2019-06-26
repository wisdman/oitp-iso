package main

type ITrainingType string

const (
	Everyday ITrainingType = "everyday"
	Once     ITrainingType = "once"
)

type Training struct {
	UUID string `json:"uuid"`

	Type      ITrainingType `json:"type"`
	TimeLimit uint16        `json:"timeLimit"`

	Trainers []interface{} `json:"trainers"`
}

func newEverydayTraining() *Training {
	return &Training{
		Type:      Everyday,
		TimeLimit: 1800,
	}
}

func newOnceTraining() *Training {
	return &Training{
		Type:      Once,
		TimeLimit: 300,
	}
}
