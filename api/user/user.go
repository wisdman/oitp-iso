package main

type User struct {
	ID string `json:"id"`

	Name   string  `json:"name"`
	Avatar *string `json:"avatar"`

	Premium uint `json:"premium"`

	Charge uint `json:"charge"`

	Intelligence uint `json:"intelligence"`
	Knowledge    uint `json:"knowledge"`
	Memory       uint `json:"memory"`

	Speed []uint `json:"speed"`
}
