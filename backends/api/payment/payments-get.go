package main

import (
	"encoding/json"
	"net/http"

	// "github.com/wisdman/oitp-isov/backends/lib/middleware"
	"github.com/wisdman/oitp-isov/backends/lib/service"
	"github.com/wisdman/oitp-isov/backends/lib/tinkoff"
)

func (api *API) GetPayments(w http.ResponseWriter, r *http.Request) {
	// sql := middleware.GetDBTransaction(r)

	request := &tinkoff.InitRequest{
		Amount:      500000,
		CustomerKey: "eca11384-ca83-11e9-8244-2bbe74ad7bd5",
		Description: "Оплата обучения в Online Школе Васильевой ЛЛ",
		OrderId:     "861a350c-ca95-11e9-b2bc-3b23a95cf2c0",
		Receipt: &tinkoff.Receipt{
			Email:        "wisdman@wisdman.io",
			EmailCompany: "payment@vllschool.com",
			Taxation:     tinkoff.TaxationPatent,
			Items: []*tinkoff.ReceiptItem{{
				Name:          "Оплата обучения",
				Price:         500000,
				Quantity:      1,
				Amount:        500000,
				PaymentMethod: tinkoff.PaymentMethodFullPayment,
				PaymentObject: tinkoff.PaymentObjectService,
				Tax:           tinkoff.TaxNone,
			}},
		},
	}

	response, err := api.tinkoff.Init(request)
	if err != nil {
		service.Fatal(w, err)
	}

	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
