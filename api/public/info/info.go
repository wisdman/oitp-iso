package main

type IInfoType string

const (
	Image IInfoType = "image"
	Text  IInfoType = "text"
	Video IInfoType = "video"
	Html  IInfoType = "html"
)

type ITarget string

const (
	Blank ITarget = "_blank"
	Self  ITarget = "_self"
)

type Info struct {
	Type IInfoType `json:"type"`
	Data *string   `json:"data"`

	Href   string  `json:"href"`
	Target ITarget `json:"target"`
}

func newInfo(
	infoType IInfoType,
) *Info {
	return &Info{Type: infoType}
}
