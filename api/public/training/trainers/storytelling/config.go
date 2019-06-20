package storytelling

import (
	"math/rand"

	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
)

const MAX_RELAX_ID = 45

type Parameters struct {
	PlayTimeLimit uint16 `json:"playTimeLimit"`
}

type Config struct {
	*abstract.Config

	Image int `json:"image"`
	Audio int `json:"audio"`
}

func newConfig(
	params Parameters,
) *Config {
	return &Config{
		Config: abstract.NewConfig(abstract.UIStorytelling),
		Image:  rand.Intn(MAX_RELAX_ID + 1),
	}
}

type Question struct {
	Data    *string `json:"data"`
	Correct *bool   `json:"correct"`
}

type QuestionConfig struct {
	*abstract.Config

	PlayTimeLimit uint16 `json:"playTimeLimit"`

	Data    *string `json:"data"`
	Correct *bool   `json:"correct"`
}

func newQuestionConfig(
	params Parameters,
) *QuestionConfig {
	return &QuestionConfig{
		Config:        abstract.NewConfig(abstract.UITextQuestion),
		PlayTimeLimit: params.PlayTimeLimit,
	}
}
