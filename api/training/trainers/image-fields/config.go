package imageFields

import (
	"math/rand"
	"time"

	"github.com/wisdman/oitp-isov/api/training/trainers"
)

type Parameters struct {
	*trainers.Parameters

	Pages           uint8  `json:"pages", description:"Количество страниц"`
	MinItemsPerPage uint8  `json:"minItemsPerPage", description:"Минимальное число картинок на странице"`
	MaxItemsPerPage uint8  `json:"maxItemsPerPage", description:"Максимальное число картинок на странице"`
	PageTimeLimit   uint16 `json:"pageTimeLimit", description:"Лимит времени для просмотра страницы"`

	AnswersCoint uint8 `json:"answersCoint", description:"Количество вариантов ответа"`
	ExtraItems   uint8 `json:"extraItems", description:"Количество фейковых ответов"`
}

type Config struct {
	*trainers.Config

	Items []*string `json:"items"`
}

func newConfig(
	param Parameters,
) *Config {
	rand.Seed(time.Now().UnixNano())
	length := rand.Intn(int(param.MaxItemsPerPage)-int(param.MinItemsPerPage)+1) + int(param.MinItemsPerPage)

	return &Config{
		Config: trainers.NewConfig(trainers.UIImageField, param.PageTimeLimit),
		Items:  make([]*string, length),
	}
}
