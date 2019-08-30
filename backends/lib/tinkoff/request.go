package tinkoff

type BaseRequest struct {
	TerminalKey string `json:"TerminalKey"` // Идентификатор терминала
	Token       string `json:"Token"`       // Подпись запроса.
}

type RequestInterface interface {
	GetValuesForToken() map[string]string
	SetTerminalKey(key string)
	SetToken(token string)
}

func (r *BaseRequest) SetTerminalKey(key string) {
	r.TerminalKey = key
}

func (r *BaseRequest) SetToken(token string) {
	r.Token = token
}
