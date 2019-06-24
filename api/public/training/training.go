package main

import (
	"github.com/wisdman/oitp-isov/api/lib/uuid"
)

type ITrainingType string

const (
	Debug    ITrainingType = "debug"
	Everyday ITrainingType = "everyday"
	Once     ITrainingType = "once"
)

type Training struct {
	ID uuid.UID `json:"id"`

	Type      ITrainingType `json:"type"`
	TimeLimit uint16        `json:"timeLimit"`

	Trainers []interface{} `json:"trainers"`
}

func newTraining(
	trainingType ITrainingType,
	timeLimit uint16,
) *Training {
	return &Training{
		ID: uuid.UUID(),

		Type:      trainingType,
		TimeLimit: timeLimit,
	}
}
