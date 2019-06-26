package trainers

import (
	"context"

	"github.com/wisdman/oitp-isov/api/public/training/trainers/abstract"
	"github.com/wisdman/oitp-isov/api/public/training/trainers/classification-colors"
	"github.com/wisdman/oitp-isov/api/public/training/trainers/classification-definitions"
	"github.com/wisdman/oitp-isov/api/public/training/trainers/classification-words"
	"github.com/wisdman/oitp-isov/api/public/training/trainers/image-carpets"
	"github.com/wisdman/oitp-isov/api/public/training/trainers/image-differences"
	"github.com/wisdman/oitp-isov/api/public/training/trainers/image-expressions"
	"github.com/wisdman/oitp-isov/api/public/training/trainers/image-fields"
	"github.com/wisdman/oitp-isov/api/public/training/trainers/math-equation"
	"github.com/wisdman/oitp-isov/api/public/training/trainers/math-middle"
	"github.com/wisdman/oitp-isov/api/public/training/trainers/math-sequence"
	"github.com/wisdman/oitp-isov/api/public/training/trainers/math-waste"
	"github.com/wisdman/oitp-isov/api/public/training/trainers/matrix-filling"
	"github.com/wisdman/oitp-isov/api/public/training/trainers/matrix-sequence"
	"github.com/wisdman/oitp-isov/api/public/training/trainers/relax"
	"github.com/wisdman/oitp-isov/api/public/training/trainers/space-questions"
	"github.com/wisdman/oitp-isov/api/public/training/trainers/storytelling"
	"github.com/wisdman/oitp-isov/api/public/training/trainers/table-pipe"
	"github.com/wisdman/oitp-isov/api/public/training/trainers/table-words"
	"github.com/wisdman/oitp-isov/api/public/training/trainers/text-letters"
	"github.com/wisdman/oitp-isov/api/public/training/trainers/text-reading"
	"github.com/wisdman/oitp-isov/api/public/training/trainers/text-tezirovanie"
	"github.com/wisdman/oitp-isov/api/public/training/trainers/words-column"
	"github.com/wisdman/oitp-isov/api/public/training/trainers/words-lexis"
	"github.com/wisdman/oitp-isov/api/public/training/trainers/words-pairs"
	"github.com/wisdman/oitp-isov/api/public/training/trainers/words-questions-close"
	"github.com/wisdman/oitp-isov/api/public/training/trainers/words-questions-waste"
)

type ITrainerBuilder func(context.Context) (
	[]interface{},
	context.Context,
	error,
)

var BuildFunctions = map[abstract.ITrainer]ITrainerBuilder{
	abstract.ClassificationColors:      classificationColors.Build,
	abstract.ClassificationDefinitions: classificationDefinitions.Build,
	abstract.ClassificationWords:       classificationWords.Build,
	abstract.ImageCarpets:              imageCarpets.Build,
	abstract.ImageDifferences:          imageDifferences.Build,
	abstract.ImageExpressions:          imageExpressions.Build,
	abstract.ImageFields:               imageFields.Build,
	abstract.MathEquation:              mathEquation.Build,
	abstract.MathMiddle:                mathMiddle.Build,
	abstract.MathSequence:              mathSequence.Build,
	abstract.MathWaste:                 mathWaste.Build,
	abstract.MatrixFillingPattern:      matrixFilling.BuildPattern,
	abstract.MatrixFillingUnique:       matrixFilling.BuildUnique,
	abstract.MatrixSequencePattern:     matrixSequence.BuildPattern,
	abstract.MatrixSequenceRandom:      matrixSequence.BuildRandom,
	abstract.Relax:                     relax.Build,
	abstract.SpaceQuestionsWaste2D:     spaceQuestions.BuildWaste2D,
	abstract.SpaceQuestionsWaste3D:     spaceQuestions.BuildWaste3D,
	abstract.Storytelling:              storytelling.Build,
	abstract.TablePipeEN:               tablePipe.BuildEN,
	abstract.TablePipeNumber:           tablePipe.BuildNUMBERS,
	abstract.TablePipeRU:               tablePipe.BuildRU,
	abstract.TableWords:                tableWords.Build,
	abstract.TextLetters:               textLetters.Build,
	abstract.TextReading:               textReading.Build,
	abstract.TextTezirovanie:           textTezirovanie.Build,
	abstract.WordsColumn:               wordsColumn.Build,
	abstract.WordsLexisAntonyms:        wordsLexis.BuildAntonyms,
	abstract.WordsLexisParonyms:        wordsLexis.BuildParonyms,
	abstract.WordsLexisSynonyms:        wordsLexis.BuildSynonyms,
	abstract.WordsPairs:                wordsPairs.Build,
	abstract.WordsQuestionsClose:       wordsQuestionClose.Build,
	abstract.WordsQuestionsWaste:       wordsQuestionWaste.Build,
}

func Build(
	ctx context.Context,
	trainer abstract.ITrainer,
) (
	[]interface{},
	context.Context,
	error,
) {
	return BuildFunctions[trainer](ctx)
}
