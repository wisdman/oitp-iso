package svg

import (
	"encoding/base64"
	"fmt"
)

type SVG struct {
	left    int16
	top     int16
	width   uint16
	height  uint16
	content string
}

func (svg *SVG) String() string {
	return fmt.Sprintf(
		`<svg xmlns="http://www.w3.org/2000/svg" width="%d" height="%d" viewBox="%d %d %d %d">%s</svg>`,
		svg.width,
		svg.height,
		svg.left,
		svg.top,
		int16(svg.width)-svg.left,
		int16(svg.height)-svg.top,
		svg.content,
	)
}

func (svg *SVG) Bytes() []byte {
	return []byte(svg.String())
}

func (svg *SVG) Base64() string {
	return "data:image/svg+xml;base64," + base64.StdEncoding.EncodeToString(svg.Bytes())
}
