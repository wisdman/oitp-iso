import { UUID } from "../uuid"

import {
  ITextTezirovanieTrainerConfig
} from "../../trainers"

// const TEXTS_COUNT = 188
// const TEXTS = Array.from(Array(TEXTS_COUNT), (_,i) => `/tezirovanie/${i+1}.txt`)

// function fetchText(url: string): Promise<string> {
//   return fetch(url)
//           .then(response => response.text())
// }

export async function getTextTezirovanieTrainerConfig(): Promise<ITextTezirovanieTrainerConfig> {

  // const textUrl = TEXTS.sort(() => Math.random() - 0.5)[0]
  // const body = await fetchText(textUrl)

  const [h1, ...body] = TEXTS.sort(() => Math.random() - 0.5)[0]
                             .split(/[\n\r]+/)

  const config: ITextTezirovanieTrainerConfig = {
    id: "text-tezirovanie",
    uid: new UUID(1).toString(),
    mode: "play",
    body: `<h1>${h1}</h1>` + body.map(v => `<p>${v}</p>`).join("")
  }

  return config
}

const TEXTS =[
`Текст № 1
Все живое в природе находится в постоянном развитии, движении, изменении.
Маленький желудь, попав в землю, со временем может превратиться в хрупкое деревце. Пройдут годы, и оно станет могучим развесистым дубом, который за свою долгую жизнь подарит множество новых желудей, а они, в свою очередь, станут источником жизни других деревьев.
Так происходит и в природе, и в человеческом обществе, в котором с течением времени меняются уклад, обычаи, развиваются культура, наука.`,

`Текст № 2
Вам хорошо известна крылатая строчка Н. А. Некрасова: «Поэтом можешь ты не быть, но гражданином быть обязан». Быть гражданином – это значит активно участвовать в окружающей жизни, делать так, чтобы она стала лучше.
Если никогда ни во что не вмешиваться, в сто раз легче будет жить. Но только не интересно. Сразу тебе все чужими станут и ты всем чужой.
Все зависит от того, как относиться к жизни в свои двенадцать-тринадцать лет: чувствовать себя маленьким, ничего не знающим, посторонним во многих делах? Или с размаху, как в недавней игре, кидаться туда, где что-то не ладится, где нужны твоя уверенная помощь, надежное плечо, крепкие руки?
Ничего так не возвышает личность, как активная жизненная позиция. И это относится не только к взрослым, но и к тебе, тринадцатилетний подросток.`,

`Текст № 3
Язык тоже живой, вечно изменяющийся организм, в котором все находится в постоянном движении и развитии. «Живой как жизнь» – так сказал о языке Н. В. Гоголь.
Действительно, любой человеческий язык на протяжении веков не остается неизменным. Например, выяснено, что в древнерусском языке было не два числа, а три: единственное, множественное и двойственное. По своему происхождению глаголы прошедшего времени являются… причастиями, а потому, как и причастия, изменяются не по лицам, а по родам.
Лингвистика открыла немало таких тайн, связанных с историей русского языка. Многие из них остаются еще не разгаданными.`,

`Текст № 4
Архитектура – это строительное искусство, умение проектировать и создавать города, жилые площади, улицы, сады и парки.
Во многих городах нашей страны вы встретите древние кремли и церкви дворцы и особняки, современные здания, перед которыми захочется остановиться и повнимательнее их рассмотреть. Так же вы стояли бы в музее перед интересной картиной или скульптурой. Это потому, что здания и улицы, площади и парки, комнаты и залы своей красотой тоже могут волновать воображение и чувства. Шедевры архитектуры запоминаются как символы народов и стран. Всему миру известны Кремль и Красная площадь в Москве, Эйфелева башня в Париже, древний Акрополь в Афинах. Однако в отличие от других искусств, произведения архитектуры можно не только
созерцать, но и использовать.`,

`Текст № 5
Книга – окно в мир. Откроешь страницу, другую – раздвинутся стены комнаты, станет видно далеко-далеко; услышишь голоса тех, кто теперь от тебя за тридевять земель, за лесами, за морями.
Обо всем на свете рассказывают книги. Ты можешь побывать, не выходя из комнаты, в жарких и холодных странах, в морских и подземных глубинах, подняться к звездам, прогуливаться по горам на Луне…
Книга радует и печалится вместе с тобой. Она надежный друг, верный товарищ.
Ничто по могуществу не может сравниться с книгой, терпеливо ждущей тебя на полке. Протяни руку – и книга заговорит.`
]