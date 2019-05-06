package trainers

type ITrainer string

const (
	ClassificationColors ITrainer = "classification-colors"
	ClassificationWords  ITrainer = "classification-words"
	ImageFields          ITrainer = "image-fields"
	TablePipe            ITrainer = "table-pipe"
)

type IUITrainer string

const (
	UIClassification IUITrainer = "classification"
	UIImageField     IUITrainer = "image-field"
	UITablePipe      IUITrainer = "table-pipe"
	UIQuestion       IUITrainer = "question"
)

var ui = map[ITrainer]IUITrainer{
	ClassificationColors: UIClassification,
	ClassificationWords:  UIClassification,
	TablePipe:            UITablePipe,
}

func GetUI(trainer ITrainer) IUITrainer {
	return ui[trainer]
}
