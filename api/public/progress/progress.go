package main

type Item struct {
	Id      string  `json:"id"`
	Values  []int16 `json:"values"`
	Average int     `json:"average"`
}

type Progress struct {
	Charge uint8 `json:"charge"`

	Memory       uint8 `json:"memory"`
	Knowledge    uint8 `json:"knowledge"`
	Intelligence uint8 `json:"intelligence"`

	Speed []uint16 `json:"speed"`

	Items []*Item `json:"items"`
}
