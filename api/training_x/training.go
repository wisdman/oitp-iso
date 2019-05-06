package main

type Training struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	TimeLimit   uint   `json:"timeLimit"`

	Trainers []interface{} `json:"trainers"`
}
