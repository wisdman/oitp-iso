package main

type Progress struct {
	Charge uint8 `json:"charge"`

	Memory       uint8 `json:"memory"`
	Knowledge    uint8 `json:"knowledge"`
	Intelligence uint8 `json:"intelligence"`

	Speed []uint16 `json:"speed"`
}
