package main

type IRecommendationType string

const (
	Image IRecommendationType = "image"
	Text  IRecommendationType = "text"
	Video IRecommendationType = "icon"
)

type ITarger string

const (
	Blank ITarger = "_blank"
	Self  ITarger = "_self"
)

type Recommendation struct {
	Type IRecommendationType `json:"type"`
	Data *string             `json:"data"`
}

func newRecommendation(
	tpy IRecommendationType,
) *Recommendation {
	return &Recommendation{Type: tpy}
}
