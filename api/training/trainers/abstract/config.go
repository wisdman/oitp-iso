package abstract

import (
	"github.com/wisdman/oitp-isov/api/lib/uuid"
)

type IUITrainer string

const (
	UIClassificationColor       IUITrainer = "classification-colors"
	UIClassificationDefinitions IUITrainer = "classification-definitions"
	UIClassificationWords       IUITrainer = "classification-words"
	UIImageCarpet               IUITrainer = "image-carpet"
	UIImageDifferences          IUITrainer = "image-differences"
	UIImageExpression           IUITrainer = "image-expressions"
	UIImageField                IUITrainer = "image-field"
	UIMathEquation              IUITrainer = "math-equation"
	UIMathMiddle                IUITrainer = "math-middle"
	UIMathSequence              IUITrainer = "math-sequence"
	UIMathWaste                 IUITrainer = "math-waste"
	UIMatrixFilling             IUITrainer = "matrix-filling"
	UIMatrixSequence            IUITrainer = "matrix-sequence"
	UIQuestion                  IUITrainer = "question"
	UIRelax                     IUITrainer = "relax"
	UITablePipe                 IUITrainer = "table-pipe"
	UITableWords                IUITrainer = "table-words"
	UITextLetters               IUITrainer = "text-letters"
	UITextReading               IUITrainer = "text-reading"
	UIWordsColumns              IUITrainer = "words-columns"
	UIWordsPairs                IUITrainer = "words-pairs"
)

type Config struct {
	ID  IUITrainer `json:"id"`
	UID uuid.UID   `json:"uid"`
}

func NewConfig(
	id IUITrainer,
) *Config {
	return &Config{
		ID:  id,
		UID: uuid.UUID(),
	}
}
