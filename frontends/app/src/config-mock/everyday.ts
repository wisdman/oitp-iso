
import {
  ITrainerConfigs
} from "../trainers"

import {
  getClassificationColorsTrainerConfig,
  getClassificationImagesTrainerConfig,
  getClassificationWordsTrainerConfig,
  getImageCarpetTrainerConfigs,
  getImageDifferencesTrainerConfigs,
  getImageFieldsTrainerConfigs,
  getMatrixFillingFiguresTrainerConfigs,
  getMatrixFillingImagesTrainerConfigs,
  getMatrixFillingLettersTrainerConfigs,
  getMatrixFillingRandomFiguresTrainerConfigs,
  getMatrixFillingRandomImagesTrainerConfigs,
  getMatrixFillingRandomLettersTrainerConfigs,
  getMatrixSequenceNumbersTrainerConfigs,
  getMatrixSequenceRandomNumbersTrainerConfigs,
  getMessageTrainerConfig,
  getResultTrainerConfig,
  getTablePipeLettersTrainerConfig,
  getTextLettersTrainerConfig,
  getTextPairsTrainerConfig,
  getTextSortTrainerConfig,
  getTextTezirovanieReadTrainerConfig,
  getTextTezirovanieTrainerConfig,
  getTextExcessTrainerConfig,
  getMathQTrainerConfig,
  getTextTezirovanieReadQTrainerConfig,
} from "./trainers"

export async function EVERYDAY_TRAINERS(): Promise<Array<ITrainerConfigs>> {

  // TODO: Картинки, фразы

  return [
    await getMessageTrainerConfig({
      header: "Полная тренировка",
      text: "Полный набор тренажеров для тестирования системы",
      button: "Начать тренировку",
    }),


    // === 1.Внимание ===

    {...await getMessageTrainerConfig({
        header: "Внимание",
        text: "Графа №7",
      }),
      globalTimeLimit: 60*30,
      timeLimit: 0
    },

    await getTablePipeLettersTrainerConfig({ type: "letters", length: 30, itemsCount: 3 }), //  Длинная таблица +
    await getTablePipeLettersTrainerConfig({ type: "numbers", length: 30, itemsCount: 3 }), //  Длинная таблица +


    // === 2.Вариативность и гибкость мышления ===

    await getMessageTrainerConfig({
      header: "Вариативность и гибкость мышления",
      text: "Графа №8",
      button: "Начать",
    }),

    // TODO: Перетаскивание слов в группы (без названия групп)


    // === 3.Зрительная память ===

    await getMessageTrainerConfig({
      header: "Зрительная память",
      text: "Графа №11",
      button: "Начать",
    }),

    await getMessageTrainerConfig({
      header: "Поиск отличий",
      button: "Начать",
    }),
    ...await getImageDifferencesTrainerConfigs(), // Поиск отличий

    await getMessageTrainerConfig({
      header: "Запомнить картинки",
      button: "Начать",
    }),
    ...await getImageFieldsTrainerConfigs({itemsCount: [3,3,4], fakeCount: 3, ansversCount: 9}), // Картинки глаз и вопрос


    // === 3.Наглядно-образная память ===

    await getMessageTrainerConfig({
      header: "Наглядно-образная память",
      text: "Графа №6",
      button: "Начать",
    }),

    ...await getImageCarpetTrainerConfigs(), // Коврики (Фигуры, Символы, Геометрия)


    // === 4.Вербальный интеллект ===

    await getMessageTrainerConfig({
      header: "Вербальный интеллект",
      text: "Графа №24",
      button: "Начать",
    }),

    await getMessageTrainerConfig({ // Скачет
      header: "Синонимы",
      button: "Начать",
    }),
    await getTextPairsTrainerConfig({ type: "synonyms", itemsCount: 5 }), // Синонимы +

    await getMessageTrainerConfig({
      header: "Антонимы",
      button: "Начать",
    }),
    await getTextPairsTrainerConfig({ type: "antonyms", itemsCount: 5 }), // Антонимы +

    await getMessageTrainerConfig({
      header: "Паронимы",
      button: "Начать",
    }),
    await getTextPairsTrainerConfig({ type: "paronyms", itemsCount: 5 }), // Паронимы +

    // //TODO: Круговые схемы
    await getTextExcessTrainerConfig(), // Вычеркивание, Найди признак, из почты


    // === 5.Пространство, логика ===

    // await getMessageTrainerConfig({
    //   header: "Пространство, логика",
    //   text: "Графа №13",
    //   button: "Начать",
    // }),

    // Пространство, логика (разобрать учебник)


    // === 5.Арифметико-практическое мышление ===

    // await getMessageTrainerConfig({
    //   header: "Арифметико-практическое мышление",
    //   text: "Графа №14",
    //   button: "Начать",
    // }),

    // await getMathQTrainerConfig(), //TODO: Арифметико-практическое мышление (разобрать учебник)
    // await getMathQTrainerConfig(), //TODO: Арифметико-практическое мышление (разобрать учебник)


    // === 6.Текст. Виды чтения ===

    await getMessageTrainerConfig({
      header: "Текст. Виды чтения",
      text: "Графа №3",
      button: "Начать",
    }),

    await getTextTezirovanieReadTrainerConfig(), // Текст. Виды чтения. Рассказы!!!!!


    // === 7.Индуктивность. Ритм мысли ===

    await getMessageTrainerConfig({
      header: "Индуктивность. Ритм мысли",
      text: "Графа №17",
      button: "Начать",
    }),

    await getMathQTrainerConfig(), //TODO: Арифметико-практическое мышление (разобрать учебник)
    await getMathQTrainerConfig(), //TODO: Арифметико-практическое мышление (разобрать учебник)

    ...await getMatrixFillingFiguresTrainerConfigs({ side: 3 }), // Таблицы фигуры (паттерны)
    ...await getMatrixFillingFiguresTrainerConfigs({ side: 4 }), // Таблицы фигуры (паттерны)
    ...await getMatrixFillingImagesTrainerConfigs({ side: 3 }),  // Таблицы картинки (паттерны)
    ...await getMatrixFillingImagesTrainerConfigs({ side: 4 }),  // Таблицы картинки (паттерны)
    ...await getMatrixFillingLettersTrainerConfigs({ side: 3 }), // Таблицы буквы (паттерны)
    ...await getMatrixFillingLettersTrainerConfigs({ side: 4 }), // Таблицы буквы (паттерны)


    // === 7.Индуктивность. Нарушение ритма ===

    await getMessageTrainerConfig({
      header: "Индуктивность. Нарушение ритма",
      text: "Графа №15",
      button: "Начать",
    }),

    ...await getMatrixFillingRandomFiguresTrainerConfigs({ side: 3, itemsCount: 3 }), // Таблицы фигуры (случайные)
    ...await getMatrixFillingRandomFiguresTrainerConfigs({ side: 4, itemsCount: 3 }), // Таблицы фигуры (случайные)
    ...await getMatrixFillingRandomImagesTrainerConfigs({ side: 3, itemsCount: 3 }),  // Таблицы буквы (случайные)
    ...await getMatrixFillingRandomImagesTrainerConfigs({ side: 4, itemsCount: 3 }),  // Таблицы буквы (случайные)
    ...await getMatrixFillingRandomLettersTrainerConfigs({ side: 3, itemsCount: 3 }), // Таблицы картинки (случайные)
    ...await getMatrixFillingRandomLettersTrainerConfigs({ side: 4, itemsCount: 3 }), // Таблицы картинки (случайные)


    // // === 7.Индуктивность. Асоциации ===

    // await getMessageTrainerConfig({
    //   header: "Индуктивность. Асоциации",
    //   text: "Графа №16",
    //   button: "Начать",
    // }),

    // //TODO: Таблицы шульте (с картинками)


    // === 8.Активизация лексикона ===

    await getMessageTrainerConfig({
      header: "Активизация лексикона",
      text: "Графа №28 и №29",
      button: "Начать",
    }),

    await getClassificationWordsTrainerConfig({ groupCount: 3, itemsCount: 5}), // Словарь по группам +
    await getClassificationColorsTrainerConfig(), // Цвета +


    // === 9.Мнемотехника. Таблицы ===

    await getMessageTrainerConfig({
      header: "Мнемотехника. Таблицы",
      text: "Графа №9",
      button: "Начать",
    }),

    ...await getMatrixFillingRandomImagesTrainerConfigs({ side: 3, itemsCount: 9, unique: true }),  // Таблицы картинки (уникальные)


    // === 9.Мнемотехника. Столбики ===

    await getMessageTrainerConfig({
      header: "Мнемотехника. Столбики",
      text: "Графа №10",
      button: "Начать",
    }),

    ...await getTextSortTrainerConfig(), // Сортировка списка (столбики)  TODO!!!!! Проверить


    // === 10.Гармонизация. Картины ===

    await getMessageTrainerConfig({
      header: "Гармонизация. Картины",
      text: "Графа №18",
      button: "Начать",
    }),

    await getClassificationImagesTrainerConfig(), // Картины


    // === 11.Тексты. Информационный блок ===
    // === 11.Тезирование ===

    await getMessageTrainerConfig({
      header: "Тезирование",
      text: "Графа №26",
      button: "Начать",
    }),

    await getTextTezirovanieTrainerConfig(), // Тезирование


    // === 12.Точность. Столбики ===

    await getMessageTrainerConfig({
      header: "Точность. Столбики",
      text: "Графа №20",
      button: "Начать",
    }),

    await getTextPairsTrainerConfig({ type: "accuracy", itemsCount: 5 }), // Пары слов


    // === 12.Точность. Афоризмы ===

    await getMessageTrainerConfig({
      header: "Точность. Афоризмы",
      text: "Графа №21",
      button: "Начать",
    }),

    await getTextLettersTrainerConfig(), // Первые буквы
    await getTextLettersTrainerConfig(), // Первые буквы


    // === 12.Точность. Тексты ===

    await getMessageTrainerConfig({
      header: "Точность. Тексты",
      text: "Графа №23",
      button: "Начать",
    }),

    ...await getTextTezirovanieReadQTrainerConfig(), // Тексты. Вопросы к текстам


    // === 13.Таблицы ===

    await getMessageTrainerConfig({
      header: "Таблицы",
      text: "Графа №12",
      button: "Начать",
    }),

    await getMatrixSequenceNumbersTrainerConfigs({ side: 3 }), // Шульте !ИНДУКТИВНОСТЬ
    await getMatrixSequenceNumbersTrainerConfigs({ side: 4 }), // Шульте !ИНДУКТИВНОСТЬ
    await getMatrixSequenceRandomNumbersTrainerConfigs({ side: 3 }), // Шульте случайные
    await getMatrixSequenceRandomNumbersTrainerConfigs({ side: 4 }), // Шульте случайные
    await getMatrixSequenceRandomNumbersTrainerConfigs({ side: 5, colors: true }), // Шульте случайные цветные

    await getResultTrainerConfig(50),

  ]
}
