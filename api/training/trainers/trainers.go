package trainers

type ITrainer string

const (
	ClassificationColors ITrainer = "classification-colors"
	ClassificationWords  ITrainer = "classification-words"
	ImageFields          ITrainer = "image-fields"
	MatrixSequence       ITrainer = "matrix-sequence"
	MatrixRandomSequence ITrainer = "matrix-random-sequence"
	TablePipe            ITrainer = "table-pipe"
)

type IUITrainer string

const (
	UIClassification IUITrainer = "classification"
	UIImageField     IUITrainer = "image-field"
	UIMatrixSequence IUITrainer = "matrix-sequence"
	UIQuestion       IUITrainer = "question"
	UITablePipe      IUITrainer = "table-pipe"
	UIRelax          IUITrainer = "relax"
)

var ui = map[ITrainer]IUITrainer{
	ClassificationColors: UIClassification,
	ClassificationWords:  UIClassification,
	TablePipe:            UITablePipe,
}

func GetUI(trainer ITrainer) IUITrainer {
	return ui[trainer]
}
