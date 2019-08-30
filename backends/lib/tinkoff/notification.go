package tinkoff

type Notification struct {
	TerminalKey    string `json:"TerminalKey"` // Идентификатор магазина
	OrderId        string `json:"OrderId"`     // Номер заказа в системе Продавца
	Success        bool   `json:"Success"`     // Успешность операции
	Status         Status `json:"Status"`      // Статус платежа (см. описание статусов операций)
	PaymentId      uint64 `json:"PaymentId"`   // Уникальный идентификатор платежа
	ErrorCode      string `json:"ErrorCode"`   // Код ошибки, если произошла ошибка
	Amount         uint64 `json:"Amount"`      // Текущая сумма транзакции в копейках
	RebillId       string `json:"RebillId"`    // Идентификатор рекуррентного платежа
	CardId         uint64 `json:"CardId"`      // Идентификатор привязанной карты
	PAN            string `json:"Pan"`         // Маскированный номер карты
	DATA           string `json:"DATA"`        // Дополнительные параметры платежа,
	Token          string `json:"Token"`       // Подпись запроса
	ExpirationDate string `json:"ExpDate"`     // Срок действия карты
}

func (n *Notification) GetValuesForToken() map[string]string {
	var result = map[string]string{
		"TerminalKey": n.TerminalKey,
		"OrderId":     n.OrderId,
		"Success":     serializeBool(n.Success),
		"Status":      n.Status,
		"PaymentId":   strconv.FormatUint(n.PaymentId, 10),
		"ErrorCode":   n.ErrorCode,
		"Amount":      strconv.FormatUint(n.Amount, 10),
		"CardId":      strconv.FormatUint(n.CardId, 10),
		"Pan":         n.PAN,
		"ExpDate":     n.ExpirationDate,
	}

	if n.DATA != "" {
		result["DATA"] = n.DATA
	}

	if n.RebillID != "" {
		result["RebillId"] = n.RebillId
	}

	return result
}

func (c *Client) ParseNotification(requestBody io.Reader) (*Notification, error) {
	bytes, err := ioutil.ReadAll(requestBody)
	if err != nil {
		return nil, err
	}
	var notification Notification
	err = json.Unmarshal(bytes, &notification)
	if err != nil {
		return nil, err
	}

	if c.terminalKey != notification.TerminalKey {
		return nil, errors.New("TINKOFF ERROR: Invalid notification terminal key")
	}

	valuesForTokenGen := notification.GetValuesForToken()
	valuesForTokenGen["Password"] = c.password
	token := generateToken(valuesForTokenGen)
	if token != notification.Token {
		return nil, errors.New("TINKOFF ERROR: Invalid notification token")
	}

	return &notification, nil
}

func (c *Client) GetNotificationSuccessResponse() string {
	return "OK"
}
