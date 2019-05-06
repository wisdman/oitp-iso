package main

import (
	"github.com/wisdman/oitp-isov/api/lib/uuid"
)

type Training struct {
	ID        uuid.UID `json:"id"`
	TimeLimit uint16   `json:"timeLimit"`

	Trainers []interface{} `json:"trainers"`
}

func newTraining(
	timeLimit uint16,
) *Training {
	return &Training{
		ID:        uuid.UUID(),
		TimeLimit: timeLimit,
	}
}
