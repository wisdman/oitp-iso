package trainers

import (
	"github.com/google/uuid"
)

type QuestionAnswer struct {
	Correct bool   `json:"correct"`
	Data    string `json:"data"`
}

type QuestionConfig struct {
	ID        string `json:"id"`
	UID       string `json:"uid"`
	Body      string `json:"body"`
	TimeLimit int    `json:"timeLimit"`

	Type   string `json:"type"`
	Button string `json:"button"`

	Items []*QuestionAnswer `json:"items"`
}

func Message(
	body string,
	button string,
) (
	configs []interface{},
	err error,
) {

	if button == "" {
		button = "Продолжить"
	}

	uid, err := uuid.NewUUID()
	if err != nil {
		return nil, err
	}

	configs = append(configs, &QuestionConfig{
		ID:        "question",
		UID:       uid.String(),
		Body:      body,
		TimeLimit: 0,

		Type:   "text",
		Button: button,
	})
	return configs, nil
}
