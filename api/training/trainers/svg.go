package trainers

import (
	"encoding/base64"
	"fmt"
)

func getCharSVG(char rune) string {
	svg := fmt.Sprintf(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><text style="color:rgba(0,0,0,0.87);font-family:'Open Sans','Helvetica Neue',sans-serif;font-weight:600;font-size:24px" y="50%%" dy="2px" x="50%%" dominant-baseline="middle" text-anchor="middle">%s</text></svg>`, char)
	encoded := base64.StdEncoding.EncodeToString([]byte(svg))
	return "data:image/svg+xml;base64," + encoded
}
