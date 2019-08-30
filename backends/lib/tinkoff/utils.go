package tinkoff

import (
	"bytes"
	"crypto/sha256"
	"fmt"
	"sort"
)

func generateToken(v map[string]string) string {
	keys := make([]string, 0)
	for key := range v {
		keys = append(keys, key)
	}
	sort.Strings(keys)
	var b bytes.Buffer
	for _, key := range keys {
		b.WriteString(v[key])
	}
	sum := sha256.Sum256(b.Bytes())
	return fmt.Sprintf("%x", sum)
}

func serializeBool(b bool) string {
	if b {
		return "true"
	}
	return "false"
}
