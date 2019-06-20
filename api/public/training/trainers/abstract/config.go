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
	UIImageExpressionQuestion   IUITrainer = "image-expressions-question"
	UIImageField                IUITrainer = "image-field"
	UIImageFieldQuestion        IUITrainer = "image-field-question"
	UIMathEquation              IUITrainer = "math-equation"
	UIMathMiddle                IUITrainer = "math-middle"
	UIMathSequence              IUITrainer = "math-sequence"
	UIMathWaste                 IUITrainer = "math-waste"
	UIMatrixFilling             IUITrainer = "matrix-filling"
	UIMatrixFillingQuestion     IUITrainer = "matrix-filling-question"
	UIMatrixSequence            IUITrainer = "matrix-sequence"
	UIRelax                     IUITrainer = "relax"
	UIStorytelling              IUITrainer = "storytelling"
	UISpaceQuestionWaste        IUITrainer = "space-question-waste"
	UITablePipe                 IUITrainer = "table-pipe"
	UITableWords                IUITrainer = "table-words"
	UITextLetters               IUITrainer = "text-letters"
	UITextQuestion              IUITrainer = "text-question"
	UITextReading               IUITrainer = "text-reading"
	UITextTezirovanie           IUITrainer = "text-tezirovanie"
	UIWordsColumn               IUITrainer = "words-column"
	UIWordsLexis                IUITrainer = "words-lexis"
	UIWordsPairs                IUITrainer = "words-pairs"
	UIWordsQuestionClose        IUITrainer = "words-question-close"
	UIWordsQuestionWaste        IUITrainer = "words-question-waste"
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
