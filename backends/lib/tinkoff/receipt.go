package tinkoff

import (
	"errors"
)

type PaymentMethod string

const (
	PaymentMethodFullPrepayment PaymentMethod = "full_prepayment" // предоплата 100%
	PaymentMethodPrepayment     PaymentMethod = "prepayment"      // предоплата
	PaymentMethodAdvance        PaymentMethod = "advance"         // аванс
	PaymentMethodFullPayment    PaymentMethod = "full_payment"    // полный расчет
	PaymentMethodPartialPayment PaymentMethod = "partial_payment" // частичный расчет и кредит
	PaymentMethodCredit         PaymentMethod = "credit"          // передача в кредит
	PaymentMethodCreditPayment  PaymentMethod = "credit_payment"  // оплата кредита
)

type PaymentObject string

const (
	PaymentObjectCommodity            PaymentObject = "commodity"             // товар
	PaymentObjectExcise               PaymentObject = "excise"                // подакцизный товар
	PaymentObjectJob                  PaymentObject = "job"                   // работа
	PaymentObjectService              PaymentObject = "service"               // услуга
	PaymentObjectGamblingBet          PaymentObject = "gambling_bet"          // ставка азартной игры
	PaymentObjectGamblingPrize        PaymentObject = "gambling_prize"        // выигрыш азартной игры
	PaymentObjectLottery              PaymentObject = "lottery"               // лотерейный билет
	PaymentObjectLotteryPrize         PaymentObject = "lottery_prize"         // выигрыш лотереи
	PaymentObjectIntellectualActivity PaymentObject = "intellectual_activity" // предоставление результатов интеллектуальной деятельности
	PaymentObjectPayment              PaymentObject = "payment"               // платеж
	PaymentObjectAgentCommission      PaymentObject = "agent_commission"      // агентское вознаграждение
	PaymentObjectComposite            PaymentObject = "composite"             // составной предмет расчета
	PaymentObjectAnother              PaymentObject = "another"               // иной предмет расчета
)

type Taxation string

const (
	TaxationOSN              Taxation = "osn"                // общая СН
	TaxationUSNIncome        Taxation = "usn_income"         // упрощенная СН (доходы)
	TaxationUSNIncomeOutcome Taxation = "usn_income_outcome" // упрощенная СН (доходы минус расходы)
	TaxationENVD             Taxation = "envd"               // единый налог на вмененный доход
	TaxationESN              Taxation = "esn"                // единый сельскохозяйственный налог
	TaxationPatent           Taxation = "patent"             // патентная СН
)

type Tax string

const (
	TaxNone Tax = "none"   // без НДС
	Tax0    Tax = "vat0"   // НДС по ставке 0%
	Tax10   Tax = "vat10"  // НДС чека по ставке 10%
	Tax20   Tax = "vat20"  // НДС чека по ставке 20%
	Tax110  Tax = "vat110" // НДС чека по расчетной ставке 10/110
	Tax120  Tax = "vat120" // НДС чека по расчетной ставке 20/120
)

type ReceiptItem struct {
	Name          string        // Наименование товара. Максимальная длина строки – 128 символов
	Price         uint64        // Цена в копейках. Целочисленное значение не более 10 знаков
	Quantity      uint8         // Количество/вес: целая часть не более 8 знаков; дробная часть не более 3 знаков
	Amount        uint64        // Сумма в копейках. Целочисленное значение не более 10 знаков
	PaymentMethod PaymentMethod // Признак способа расчёта.
	PaymentObject PaymentObject // Признак предмета расчёта.
	Tax           Tax           // Ставка налога
}

func (i *ReceiptItem) Validate() error {
	if i.Name == "" || len(i.Name) > 128 {
		return errors.New("Incorrect Receipt item Name")
	}

	if i.Price == 0 {
		return errors.New("Incorrect Receipt item Price")
	}

	if i.Quantity == 0 {
		return errors.New("Incorrect Receipt item Quantity")
	}

	if i.Amount == 0 {
		return errors.New("Incorrect Receipt item Amount")
	}

	return nil
}

type Receipt struct {
	Items        []*ReceiptItem // Массив, содержащий в себе информацию о товарах
	Email        string         // Электронный адрес для отправки чека покупателю. Поле обязательно, если не задан Phone
	Phone        string         // Телефон покупателя. Поле обязательно, если не передан параметр Email
	EmailCompany string         // Электронная почта отправителя чека. Максимальная длина строки – 64 символа
	Taxation     Taxation       // Система налогообложения.
}

func (r *Receipt) Validate() error {
	if r.Email == "" && r.Phone == "" {
		return errors.New("Incorrect Receipt. Email or Phone is not set")
	}

	if len(r.EmailCompany) > 64 {
		return errors.New("Incorrect Receipt EmailCompany")
	}

	return nil
}
