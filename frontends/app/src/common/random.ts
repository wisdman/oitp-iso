
import {
  ITrainerConfigs,
} from "../trainers"

import { getArticleConfig } from "./article.config"
import { getColorsColumnsConfig } from "./colors-columns.config"
import { getFirstLettersConfig } from "./first-letters.config"
import { getIconsTableConfig } from "./icons-table.config"
import { getMessageConfig } from "./message.config"
import { getNumberTableConfig } from "./number-table.config"
import { getResultsConfig } from "./result.config"
import { getWordsColumnsConfig } from "./words-columns.config"

async function RANDOM_EVERYDAY() {

  const {article, questions} = await getArticleConfig()

  const trainers = [
    await getMessageConfig({
      header: "Ежедневная тренировка",
      text: "Пройдите серию тренажеров продолжительностью 30 минут, чтобы завершить ежедневную тренировку.",
      button: "Начать тренировку",
    }),

    article,
    questions,

    [
      await getMessageConfig({
        header: "Сопостовление цветов",
        text: "Сопоставте цвета",
        button: "Начать",
      }),
      await getColorsColumnsConfig(),
      await getColorsColumnsConfig(),
      await getColorsColumnsConfig(),
    ],

    [
      await getMessageConfig({
        header: "Точность",
        text: "Прочите выражение, интонационно оформив, расставив логические ударения. Воспроизвести по памяти, записывая первую букву каждого слова.",
        button: "Начать",
      }),
      await getFirstLettersConfig(),
      await getFirstLettersConfig(),
      await getFirstLettersConfig(),
    ],

    [
      await getMessageConfig({
        header: "Таблицы с изображениями",
        text: "Востановите таблицу по памяти",
        button: "Начать",
      }),
      await getIconsTableConfig(),
      await getIconsTableConfig(),
      await getIconsTableConfig(),
      await getIconsTableConfig(),
      await getIconsTableConfig(),
    ],

    [
      await getMessageConfig({
        header: "Числовые таблицы",
        text: "Отмечайте числа в порядке возрастания.",
        button: "Начать",
      }),
      await getNumberTableConfig(),
      await getNumberTableConfig(),
      await getNumberTableConfig(),
    ],

    [
      await getMessageConfig({
        header: "Слова по группа",
        text: "Отсортируйте слова по группам",
        button: "Начать",
      }),
      await getWordsColumnsConfig(),
      await getWordsColumnsConfig(),
      await getWordsColumnsConfig(),
    ],

    await getResultsConfig(),
  ]

  console.dir(trainers)

  return trainers.flat()
}


async function RANDOM_ONCE() {
  const trainers = [
    await getMessageConfig({
      header: "Разовая тренировка",
      text: "Пройдите тренажер подобранный специально для вас.",
      button: "Начать тренировку",
    }),
    await getFirstLettersConfig(),
  ]

  return trainers
}


export function RANDOM_CONFIG(type: "everyday" | "once"): Promise< Array<ITrainerConfigs> > {
  switch (type) {
    case "everyday":
      return RANDOM_EVERYDAY()
      break

    case "once":
      return RANDOM_ONCE()
      break
  }
  throw new TypeError("Incorrect training type")
}



