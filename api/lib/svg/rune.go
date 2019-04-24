package svg

import (
	"fmt"
)

func RuneSVG(r rune) *SVG {
	return &SVG{0, 0, 24, 24, fmt.Sprintf(`<text style="color:rgba(0,0,0,0.87);font-family:'Open Sans','Helvetica Neue',sans-serif;font-weight:600;font-size:24px" y="50%%" dy="2px" x="50%%" dominant-baseline="middle" text-anchor="middle">%c</text>`, r)}
}
