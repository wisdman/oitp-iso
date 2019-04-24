package trainers

import (
	"math/rand"
	"time"

	"github.com/wisdman/oitp-isov/api/lib/uuid"
)

type ImageDifferencesConfig struct {
	ID        string `json:"id"`
	UID       string `json:"uid"`
	TimeLimit int    `json:"timeLimit"`

	ImageA int `json:"imageA"`
	ImageB int `json:"imageB"`
}

func newImageDifferencesConfig() *ImageDifferencesConfig {
	return &ImageDifferencesConfig{
		ID:        "image-differences",
		UID:       uuid.UUID(),
		TimeLimit: 60,
	}
}

// TODO: Move to frontend
func ImageDifferences() (
	configs []interface{},
	err error,
) {
	rand.Seed(time.Now().UnixNano())
	img := rand.Intn(20)
	config := newImageDifferencesConfig()
	config.ImageA = img + 1
	config.ImageB = img + 2
	configs = append(configs, config)
	return
}
