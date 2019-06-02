package trainers

import (
	"github.com/wisdman/oitp-isov/api/lib/db"

	"github.com/wisdman/oitp-isov/api/training/trainers/classification-colors"
	"github.com/wisdman/oitp-isov/api/training/trainers/classification-definitions"
	"github.com/wisdman/oitp-isov/api/training/trainers/classification-words"
	"github.com/wisdman/oitp-isov/api/training/trainers/image-carpets"
	"github.com/wisdman/oitp-isov/api/training/trainers/image-differences"
	"github.com/wisdman/oitp-isov/api/training/trainers/image-expressions"
	"github.com/wisdman/oitp-isov/api/training/trainers/image-fields"
	"github.com/wisdman/oitp-isov/api/training/trainers/math-equation"
	"github.com/wisdman/oitp-isov/api/training/trainers/math-middle"
	"github.com/wisdman/oitp-isov/api/training/trainers/math-sequence"
	"github.com/wisdman/oitp-isov/api/training/trainers/math-waste"
	"github.com/wisdman/oitp-isov/api/training/trainers/matrix-filling"
	"github.com/wisdman/oitp-isov/api/training/trainers/matrix-sequence"
	"github.com/wisdman/oitp-isov/api/training/trainers/relax"
	"github.com/wisdman/oitp-isov/api/training/trainers/space-questions"
	"github.com/wisdman/oitp-isov/api/training/trainers/table-pipe"
	"github.com/wisdman/oitp-isov/api/training/trainers/table-words"
	"github.com/wisdman/oitp-isov/api/training/trainers/text-letters"
	"github.com/wisdman/oitp-isov/api/training/trainers/text-reading"
	"github.com/wisdman/oitp-isov/api/training/trainers/words-columns"
	"github.com/wisdman/oitp-isov/api/training/trainers/words-pairs"
	"github.com/wisdman/oitp-isov/api/training/trainers/words-questions"
)

type ITrainer string

const (
	ClassificationColors      ITrainer = "classification-colors"      // Активизация лексиклна
	ClassificationDefinitions ITrainer = "classification-definitions" // Активизация лексиклна
	ClassificationWords       ITrainer = "classification-words"       // Активизация лексиклна
	ImageCarpets              ITrainer = "image-carpets"              // Наглядно-образная память
	ImageDifferences          ITrainer = "image-differences"          // Наглядно-образная память
	ImageExpressions          ITrainer = "image-expressions"          // Гармонизация работы полушарий
	ImageFields               ITrainer = "image-fields"               // Скорость зрительного восприятия
	MathEquation              ITrainer = "math-equation"              // Арифметико-практическое мышление
	MathMiddle                ITrainer = "math-middle"                // Арифметико-практическое мышление
	MathSequence              ITrainer = "math-sequence"              // Арифметико-практическое мышление
	MathWaste                 ITrainer = "math-waste"                 // Арифметико-практическое мышление
	MatrixFillingPattern      ITrainer = "matrix-filling-pattern"     // Индуктивность
	MatrixFillingUnique       ITrainer = "matrix-filling-unique"      // Мнемотехника
	MatrixSequencePattern     ITrainer = "matrix-sequence-pattern"    // Индуктивность мышления
	MatrixSequenceRandom      ITrainer = "matrix-sequence-random"     // Таблицы с произвольным рассположением чисел
	Relax                     ITrainer = "relax"                      // Расслабление
	SpaceQuestionsWaste2D     ITrainer = "space-waste-2d"             // Пространство и логика
	SpaceQuestionsWaste3D     ITrainer = "space-waste-3d"             // Пространство и логика

	TablePipeEN            ITrainer = "table-pipe-en"            // Разминка EN
	TablePipeNumber        ITrainer = "table-pipe-number"        // Разминка Цифры
	TablePipeRU            ITrainer = "table-pipe-ru"            // Разминка RU
	TableWords             ITrainer = "table-words"              // Заполнение таблицы словами
	TextLetters            ITrainer = "text-letters"             // Первые буквы слов фразы
	TextReadingRO          ITrainer = "text-reading-ro"          // Текст для чтения и вопросы
	TextReadingTezirovanie ITrainer = "text-reading-tezirovanie" // Тезирование
	WordsColumnsPairs      ITrainer = "words-columns-pairs"      // Два столбика слов
	WordsColumnsWords      ITrainer = "words-columns-words"      // Востановить список слов по памяти
	WordsPairsAntonyms     ITrainer = "words-pairs-antonyms"     // Два столбика слов, антинимы
	WordsPairsParonyms     ITrainer = "words-pairs-paronyms"     // Два столбика слов, паронимы
	WordsPairsSynonyms     ITrainer = "words-pairs-synonyms"     // Два столбика слов, синонимы
	WordsQuestionsClose    ITrainer = "words-questions-close"    // Выбрать наиболее близкое слово
	WordsQuestionsWaste    ITrainer = "words-questions-waste"    // Выбрать лишнее слово
)

type ITrainerBuilder func(
	sql *db.Transaction,
	complexity uint8,
) (
	configs []interface{},
	err error,
)

var BuildFunctions = map[ITrainer]ITrainerBuilder{
	ClassificationColors:      classificationColors.Build,
	ClassificationDefinitions: classificationDefinitions.Build,
	ClassificationWords:       classificationWords.Build,
	ImageCarpets:              imageCarpets.Build,
	ImageDifferences:          imageDifferences.Build,
	ImageExpressions:          imageExpressions.Build,
	ImageFields:               imageFields.Build,
	MathEquation:              mathEquation.Build,
	MathMiddle:                mathMiddle.Build,
	MathSequence:              mathSequence.Build,
	MathWaste:                 mathWaste.Build,
	MatrixFillingPattern:      matrixFilling.BuildPattern,
	MatrixFillingUnique:       matrixFilling.BuildUnique,
	MatrixSequencePattern:     matrixSequence.BuildPattern,
	MatrixSequenceRandom:      matrixSequence.BuildRandom,
	Relax:                     relax.Build,
	SpaceQuestionsWaste2D:     spaceQuestions.BuildWaste2D,
	SpaceQuestionsWaste3D:     spaceQuestions.BuildWaste3D,
	TablePipeEN:               tablePipe.BuildEN,
	TablePipeNumber:           tablePipe.BuildNUMBERS,
	TablePipeRU:               tablePipe.BuildRU,
	TableWords:                tableWords.Build,
	TextLetters:               textLetters.Build,
	TextReadingRO:             textReading.BuildReading,
	TextReadingTezirovanie:    textReading.BuildTezirovanie,
	WordsColumnsPairs:         wordsColumns.BuildPairs,
	WordsColumnsWords:         wordsColumns.BuildWords,
	WordsPairsAntonyms:        wordsPairs.BuildAntonyms,
	WordsPairsParonyms:        wordsPairs.BuildParonyms,
	WordsPairsSynonyms:        wordsPairs.BuildSynonyms,
	WordsQuestionsClose:       wordsQuestion.BuildClose,
	WordsQuestionsWaste:       wordsQuestion.BuildWaste,
}

func Build(
	sql *db.Transaction,
	trainer ITrainer,
	complexity uint8,
) (
	configs []interface{},
	err error,
) {
	return BuildFunctions[trainer](sql, complexity)
}
