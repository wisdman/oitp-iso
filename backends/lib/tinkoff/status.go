package tinkoff

type Status string

const (
	Status3dsChecked      Status = "3DS_CHECKED"      // Покупатель завершил проверку 3-D Secure
	Status3dsChecking     Status = "3DS_CHECKING"     // Покупатель начал аутентификацию по протоколу 3-D Secure.
	StatusAuthFail        Status = "AUTH_FAIL"        // Ошибка платежа. Остались попытки оплаты
	StatusAuthorized      Status = "AUTHORIZED"       // Средства заблокированы, но не списаны
	StatusAuthorizing     Status = "AUTHORIZING"      // Система начала обработку оплаты платежа
	StatusCanceled        Status = "CANCELED"         // Отмена платежа
	StatusConfirmed       Status = "CONFIRMED"        // Денежные средства успешно списаны
	StatusConfirming      Status = "CONFIRMING"       // Начало списания денежных средств
	StatusDeadlineExpired Status = "DEADLINE_EXPIRED" // Истек срок платежа
	StatusFormshowed      Status = "FORMSHOWED"       // Покупатель перенаправлен на страницу оплаты
	StatusNew             Status = "NEW"              // Платёж создан
	StatusPartialRefunded Status = "PARTIAL_REFUNDED" // Произведен частичный возврат денежных средств
	StatusRefunded        Status = "REFUNDED"         // Произведен возврат денежных средств
	StatusRefunding       Status = "REFUNDING"        // Начало возврата денежных средств
	StatusRejected        Status = "REJECTED"         // Ошибка платежа. Истекли попытки оплаты
	StatusReversed        Status = "REVERSED"         // Денежные средства разблокированы
	StatusReversing       Status = "REVERSING"        // Начало отмены блокировки средств
)
