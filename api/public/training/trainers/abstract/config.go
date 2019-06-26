package abstract

type UUID string

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
	MatrixFillingPattern      ITrainer = "matrix-filling-pattern"     // Индуктивность мышления
	MatrixFillingUnique       ITrainer = "matrix-filling-unique"      // Мнемотехника
	MatrixSequencePattern     ITrainer = "matrix-sequence-pattern"    // Индуктивность мышления
	MatrixSequenceRandom      ITrainer = "matrix-sequence-random"     // Таблицы с произвольным рассположением чисел
	Relax                     ITrainer = "relax"                      // Расслабление
	SpaceQuestionsWaste2D     ITrainer = "space-waste-2d"             // Пространство и логика
	SpaceQuestionsWaste3D     ITrainer = "space-waste-3d"             // Пространство и логика
	Storytelling              ITrainer = "storytelling"               // Слуховая память
	TablePipeEN               ITrainer = "table-pipe-en"              // Распределение внимания
	TablePipeNumber           ITrainer = "table-pipe-number"          // Распределение внимания
	TablePipeRU               ITrainer = "table-pipe-ru"              // Распределение внимания
	TableWords                ITrainer = "table-words"                // Вариативность мышления
	TextLetters               ITrainer = "text-letters"               // Точность восприятия - афоризмы
	TextReading               ITrainer = "text-reading"               // Точность восприятия - тексты
	TextTezirovanie           ITrainer = "text-tezirovanie"           // Тезирование
	WordsColumn               ITrainer = "words-column"               // Мнемотехника. Столбики
	WordsLexisAntonyms        ITrainer = "words-lexis-antonyms"       // Вербальный интеллект - Антонимы
	WordsLexisParonyms        ITrainer = "words-lexis-paronyms"       // Вербальный интеллект - Паронимы
	WordsLexisSynonyms        ITrainer = "words-lexis-synonyms"       // Вербальный интеллект - Синонимы
	WordsPairs                ITrainer = "words-pairs"                // Точность восприятия - Столбики
	WordsQuestionsClose       ITrainer = "words-questions-close"      // Активизация лексикона
	WordsQuestionsWaste       ITrainer = "words-questions-waste"      // Вербальный интеллект
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
	UISpaceQuestionWaste        IUITrainer = "space-question-waste"
	UIStorytelling              IUITrainer = "storytelling"
	UIStorytellingQuestion      IUITrainer = "storytelling-question"
	UITablePipe                 IUITrainer = "table-pipe"
	UITableWords                IUITrainer = "table-words"
	UITextLetters               IUITrainer = "text-letters"
	UITextReading               IUITrainer = "text-reading"
	UITextReadingQuestion       IUITrainer = "text-reading-question"
	UITextTezirovanie           IUITrainer = "text-tezirovanie"
	UIWordsColumn               IUITrainer = "words-column"
	UIWordsLexis                IUITrainer = "words-lexis"
	UIWordsPairs                IUITrainer = "words-pairs"
	UIWordsQuestionClose        IUITrainer = "words-question-close"
	UIWordsQuestionWaste        IUITrainer = "words-question-waste"
)

type ITrainerGroup string

const (
	Lexicon            ITrainerGroup = "lexicon"             // Активизация лексикона
	Arithmetic         ITrainerGroup = "arithmetic"          // Арифметико-практическое мышление
	Variability        ITrainerGroup = "variability"         // Вариативность мышления
	Verbal             ITrainerGroup = "verbal"              // Вербальный интеллект
	Harmonization      ITrainerGroup = "harmonization"       // Гармонизация работы полушарий
	Inductance         ITrainerGroup = "inductance"          // Индуктивность мышления
	Mnemonics          ITrainerGroup = "mnemonics"           // Мнемотехника
	VisuallyMemory     ITrainerGroup = "visually-memory"     // Наглядно-образная память
	SpaceLogic         ITrainerGroup = "space-logic"         // Пространство и логика
	Attention          ITrainerGroup = "attention"           // Распределение внимания
	VisuallyPerception ITrainerGroup = "visually-perception" // Скорость зрительного восприятия
	AuditoryMemory     ITrainerGroup = "auditory-memory"     // Слуховая память
	Teasing            ITrainerGroup = "teasing"             // Тезирование
	Accuracy           ITrainerGroup = "accuracy"            // Точность восприятия
)

type Config struct {
	ID   ITrainer   `json:"id"`
	UI   IUITrainer `json:"ui"`
	UUID UUID       `json:"uuid"`
}

func NewConfig(
	ID ITrainer,
	UI IUITrainer,
	UUID UUID,
) *Config {
	return &Config{ID, UI, UUID}
}
