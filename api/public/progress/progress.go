package main

type Item struct {
	Id      string  `json:"id"`
	Values  []int16 `json:"values"`
	Average int     `json:"average"`
}

type Progress struct {
	Charge uint8    `json:"charge"`
	Speed  []uint16 `json:"speed"`
	Items  []*Item  `json:"items"`
}
