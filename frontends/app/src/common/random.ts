
import {
  ITrainerConfigs,
} from "../trainers"

// import {
  // ShuffleArray
// } from "./functions"

// import { getArticleConfig } from "./article.config"
// import { getColorsColumnsConfig } from "./colors-columns.config"
// import { getFirstLettersConfig } from "./first-letters.config"
import { getImageTableConfig } from "./image-table.config"
import { getMessageConfig } from "./message.config"
import { getNumberTableConfig } from "./number-table.config"
import { getResultsConfig } from "./result.config"
// import { getWordsColumnsConfig } from "./words-columns.config"
// import { getImageConstructorConfig } from "./shape-field.config"
import { getTezirovanieConfig } from "./tezirovanie.config"

async function RANDOM_EVERYDAY() {

  // const {article, questions} = await getArticleConfig()

  const trainers = [
    await getMessageConfig({
      header: "Ежедневная тренировка",
      text: "Пройдите серию тренажеров продолжительностью 30 минут, чтобы завершить ежедневную тренировку.",
      button: "Начать тренировку",
    }),

    await getTezirovanieConfig(),

    // article,
    // questions,

    [
      {...await getMessageConfig({
        header: "Таблицы с изображениями",
        text: "Востановите таблицу по памяти",
        button: "Начать",
      }), globalTimeLimit: 30 * 60},
      ...(await getImageTableConfig(true, 2, 3)),
      ...(await getImageTableConfig(true, 3, 10)),
      ...(await getImageTableConfig(true, 4, 10)),
      ...(await getImageTableConfig(true, 5, 10)),

      ...(await getImageTableConfig(false, 2, 3)),
      ...(await getImageTableConfig(false, 3, 10)),
      ...(await getImageTableConfig(false, 4, 10)),
      ...(await getImageTableConfig(false, 5, 10)),
    ],

    [
      await getMessageConfig({
        header: "Числовые таблицы",
        text: "Отмечайте числа в порядке возрастания.",
        button: "Начать",
      }),
      await getNumberTableConfig(3),
      await getNumberTableConfig(3),
      await getNumberTableConfig(3),
      await getNumberTableConfig(3),
      await getNumberTableConfig(3),
      await getNumberTableConfig(4),
      await getNumberTableConfig(4),
      await getNumberTableConfig(4),
      await getNumberTableConfig(4),
      await getNumberTableConfig(4),
      await getNumberTableConfig(5),
      await getNumberTableConfig(5),
      await getNumberTableConfig(5),
      await getNumberTableConfig(5),
      await getNumberTableConfig(5),
      await getNumberTableConfig(6),
      await getNumberTableConfig(6),
      await getNumberTableConfig(6),
      await getNumberTableConfig(6),
      await getNumberTableConfig(6),
      await getNumberTableConfig(7),
      await getNumberTableConfig(7),
      await getNumberTableConfig(7),
      await getNumberTableConfig(7),
      await getNumberTableConfig(7),
    ],

    // [
    //   await getMessageConfig({
    //     header: "Конструктор изображений",
    //     text: "Востановите изображение по памяти",
    //     button: "Начать",
    //   }),
    //   ...(await getImageConstructorConfig()),
    //   ...(await getImageConstructorConfig()),
    //   ...(await getImageConstructorConfig()),
    // ],

    // [
    //   await getMessageConfig({
    //     header: "Сопостовление цветов",
    //     text: "Сопоставте цвета",
    //     button: "Начать",
    //   }),
    //   await getColorsColumnsConfig(),
    // ],

    // [
    //   await getMessageConfig({
    //     header: "Точность",
    //     text: "Прочите выражение, интонационно оформив, расставив логические ударения. Воспроизвести по памяти, записывая первую букву каждого слова.",
    //     button: "Начать",
    //   }),
    //   await getFirstLettersConfig(),
    //   await getFirstLettersConfig(),
    //   await getFirstLettersConfig(),
    //   await getFirstLettersConfig(),
    // ],

    // [
    //   await getMessageConfig({
    //     header: "Слова по группа",
    //     text: "Отсортируйте слова по группам",
    //     button: "Начать",
    //   }),
    //   await getWordsColumnsConfig(),
    //   await getWordsColumnsConfig(),
    //   await getWordsColumnsConfig(),
    // ],

    await getResultsConfig(),
  ]

  return trainers.flat()
}


async function RANDOM_ONCE() {
  const trainers = [
    await getMessageConfig({
      header: "Разовая тренировка",
      text: "Пройдите тренажер подобранный специально для вас.",
      button: "Начать тренировку",
    }),
    ...(await getImageTableConfig()),
    await getResultsConfig(),
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



