package tinkoff

import (
	"errors"
	"strconv"
)

type InitRequest struct {
	BaseRequest

	Amount      uint64   `json:"Amount"`      // Сумма в копейках
	CustomerKey string   `json:"CustomerKey"` // Идентификатор покупателя в системе Продавца
	Description string   `json:"Description"` // Краткое описание
	OrderId     string   `json:"OrderId"`     // Номер заказа в системе Продавца
	Receipt     *Receipt `json:"Receipt"`     // JSON объект с данными чека
}

func (i *InitRequest) GetValuesForToken() map[string]string {
	return map[string]string{
		"Amount":      strconv.FormatUint(i.Amount, 10),
		"CustomerKey": i.CustomerKey,
		"Description": i.Description,
		"OrderId":     i.OrderId,
	}
}

type InitResponse struct {
	TerminalKey  string `json:"TerminalKey"`          // Идентификатор терминала, выдается Продавцу Банком
	Amount       uint64 `json:"Amount"`               // Сумма в копейках
	OrderId      string `json:"OrderId"`              // Номер заказа в системе Продавца
	Success      bool   `json:"Success"`              // Успешность операции
	Status       string `json:"Status"`               // Статус транзакции
	PaymentId    string `json:"PaymentId"`            // Уникальный идентификатор транзакции в системе Банка
	PaymentURL   string `json:"PaymentURL,omitempty"` // Ссылка на страницу оплаты.
	ErrorCode    string `json:"ErrorCode"`            // Код ошибки, «0» - если успешно
	ErrorMessage string `json:"Message,omitempty"`    // Краткое описание ошибки
	ErrorDetails string `json:"Details,omitempty"`    // Подробное описание ошибки
}

func (c *Client) Init(request *InitRequest) (*InitResponse, error) {
	var response InitResponse
	if err := c.postRequest("/Init", request, &response); err != nil {
		return nil, err
	}

	if !res.Success || res.ErrorCode != "0" || res.Status == StatusRejected {
		return nil, errors.New(fmt.Sprintf(
			"TINKOFF INIT ERROR %s: %s. %s",
			res.ErrorCode,
			res.ErrorMessage,
			res.ErrorDetails,
		))
	}

	return &response, nil
}
