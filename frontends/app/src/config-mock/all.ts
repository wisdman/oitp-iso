
import {
  ITrainerConfigs
} from "../trainers"

import {
  getСolorsСlassificationTrainerConfig,
  getImageCanvasTrainerConfig,

  getImageClassificationTrainerConfig,
  getImageDifferencesTrainerConfig,

  getImageFieldTrainerConfig,

  getImageSequenceTrainerConfig,

  getImageTableTrainerConfig,
  getMessageTrainerConfig,
  getNumberExclusionTrainerConfig,
  getNumberExpressionTrainerConfig,
  getNumberSeriesTrainerConfig,

  getNumberShapeTrainerConfig,

  getNumberTableTrainerConfig,
  getQuestionTrainerConfig,
  getResultTrainerConfig,
  getTextLettersTrainerConfig,

  getTextTezirovanieTrainerConfig,

  getWordsClassificationTrainerConfig,
  getWordsExclusionTrainerConfig,

  getWordsPairsTrainerConfig,
  getWordsShapeTrainerConfig,
} from "./configs"

export async function ALL_TRAINERS(): Promise<Array<ITrainerConfigs>> {

  return [
    await getMessageTrainerConfig({
      header: "Все тренажеры",
      text: "Полный набор тренажеров для тестирования системы",
      button: "Начать тренировку",
    }),

    { ...await getСolorsСlassificationTrainerConfig(5), globalTimeLimit: 60*30, timeLimit: 0 },

    ...await (async function () {
      const conf = { ...await getImageCanvasTrainerConfig(0), timeLimit: 0}
      return [conf, {...conf, isGameMode: true, timeLimit: 3}]
    })(),

    ...await (async function () {
      const conf = { ...await getImageCanvasTrainerConfig(1), timeLimit: 0}
      return [conf, {...conf, isGameMode: true, timeLimit: 3}]
    })(),

    ...await (async function () {
      const conf = { ...await getImageCanvasTrainerConfig(2), timeLimit: 0}
      return [conf, {...conf, isGameMode: true, timeLimit: 3}]
    })(),

    await getImageClassificationTrainerConfig(),
    await getImageDifferencesTrainerConfig(),

    await getImageFieldTrainerConfig(3),
    await getImageFieldTrainerConfig(3),
    await getImageFieldTrainerConfig(3),
    await getMessageTrainerConfig({
      header: "ВНИМАНИЕ",
      text: "Тут необходимо добавиь выбор картинок с прошлых слайдов",
      button: "Продолжить",
    }),

    await getImageSequenceTrainerConfig(),

    ...await (async function () {
      const conf = {...await getImageTableTrainerConfig(3, 3), timeLimit: 0}
      return [conf, {...conf, isGameMode: true}]
    })(),

    { ...await getNumberExclusionTrainerConfig(5), timeLimit: 0},
    { ...await getNumberExpressionTrainerConfig(4), timeLimit: 0},

    { ...await getNumberSeriesTrainerConfig(6), timeLimit: 0 },
    { ...await getNumberSeriesTrainerConfig(6), timeLimit: 0 },
    { ...await getNumberSeriesTrainerConfig(6), timeLimit: 0 },

    await getNumberShapeTrainerConfig(),

    { ...await getNumberTableTrainerConfig(3), timeLimit: 0 },
    { ...await getNumberTableTrainerConfig(3), timeLimit: 0 },
    { ...await getNumberTableTrainerConfig(3), timeLimit: 0 },
    { ...await getNumberTableTrainerConfig(3), timeLimit: 0 },

    { ...await getQuestionTrainerConfig(), timeLimit: 0 },

    { ...await getTextLettersTrainerConfig(), timeLimit: 0 },
    { ...await getTextLettersTrainerConfig(), timeLimit: 0 },
    { ...await getTextLettersTrainerConfig(), timeLimit: 0 },

    { ...await getTextTezirovanieTrainerConfig(0), timeLimit: 0 },
    { ...await getTextTezirovanieTrainerConfig(1), timeLimit: 0 },

    {...await getWordsClassificationTrainerConfig(3), timeLimit: 0 },
    {...await getWordsExclusionTrainerConfig(), timeLimit: 0 },

    await getWordsPairsTrainerConfig(5),
    await getWordsShapeTrainerConfig(),

    await getResultTrainerConfig(50),
  ]
}
