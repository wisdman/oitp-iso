package trainers

import (
	"github.com/wisdman/oitp-isov/api/lib/uuid"
)

type QuestionItemsType string

const (
	QuestionItemsType_Image QuestionItemsType = "image"
	QuestionItemsType_Input QuestionItemsType = "input"
	QuestionItemsType_None  QuestionItemsType = "none"
	QuestionItemsType_Text  QuestionItemsType = "text"
)

type QuestionItem struct {
	Data    string `json:"data"`
	Correct bool   `json:"correct"`
}

type QuestionConfig struct {
	ID        string `json:"id"`
	UID       string `json:"uid"`
	TimeLimit int    `json:"timeLimit"`

	Data   string `json:"data"`
	Button string `json:"button"`

	ItemsType QuestionItemsType `json:"itemsType"`
	Multiple  bool              `json:"multiple"`
	Items     []*QuestionItem   `json:"items"`
}

func newQuestionConfig(itemsType QuestionItemsType, timeLimit int) *QuestionConfig {
	return &QuestionConfig{
		ID:        "question",
		UID:       uuid.UUID(),
		TimeLimit: timeLimit,

		ItemsType: itemsType,
		Multiple:  false,
	}
}

// TODO: Move to frontend
func Message(
	data string,
	button string,
) (
	configs []interface{},
	err error,
) {
	if button == "" {
		button = "Продолжить"
	}

	config := newQuestionConfig(QuestionItemsType_None, 0)
	config.Data = data
	config.Button = button

	configs = append(configs, config)
	return
}
