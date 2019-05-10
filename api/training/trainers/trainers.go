package trainers

type ITrainer string

const (
	ClassificationColors ITrainer = "classification-colors"
	ClassificationWords  ITrainer = "classification-words"
	ImageFields          ITrainer = "image-fields"
	MatrixFilling        ITrainer = "matrix-filling"
	MatrixRandomFilling  ITrainer = "matrix-random-filling"
	MatrixRandomSequence ITrainer = "matrix-random-sequence"
	MatrixSequence       ITrainer = "matrix-sequence"
	MatrixUniqueFilling  ITrainer = "matrix-unique-filling"
	QuestionCloseWords   ITrainer = "question-close-words"
	QuestionWasteWords   ITrainer = "question-waste-words"
	TablePipe            ITrainer = "table-pipe"
)

type IUITrainer string

const (
	UIClassificationWords IUITrainer = "classification-words"
	UIImageField          IUITrainer = "image-field"
	UIMatrixFilling       IUITrainer = "matrix-filling"
	UIMatrixSequence      IUITrainer = "matrix-sequence"
	UIQuestion            IUITrainer = "question"
	UIRelax               IUITrainer = "relax"
	UITablePipe           IUITrainer = "table-pipe"
)
