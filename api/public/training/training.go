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

func newTraining(
	trainingType ITrainingType,
) *Training {
	return &Training{Type: trainingType}
}
