
const FS = require("fs")

// const data = FS.readFileSync("data.txt", "utf8")

const data = require("./data.json")

let newData = data
  .map(([word, ...definitions]) => ` ('${word}', ARRAY[${definitions.map(d => `'${d}'`).join(",")}]),`)
  .join("\n")

// const ruFn = (v) => v.toLowerCase().replace(/[^абвгдеёжзийклмнопрстуфхцчшщъыьэюя]+/g,"")

newData = `SET search_path = "$user";

INSERT INTO private.trainers_data_words_definitions("word","definitions") VALUES
${newData}`

FS.writeFileSync("202-words-definitions.sql", newData, "utf8")



// JSON.stringify(
// Array.from(document.querySelectorAll("table"))
//      .map(t => {
//        const definitions = Array.from(t.querySelectorAll("td:first-of-type li"))
//                                 .map(v => v.innerText)
//                                 .map(v => v.split(/\d\)/)
//                                            .map(v => v.replace(/^[\.;,\s]*/g,"").replace(/[\.;,\s]*$/g,""))
//                                            .filter(v => !!v)
//                                            .map(s => s.charAt(0).toUpperCase() + s.slice(1) )
//                                      )
//        const words = Array.from(t.querySelectorAll("td:last-of-type li"))
//                           .map(v => v.innerText.replace(/^[\.;,\s]*/g,"").replace(/[\.;,\s]*$/g,""))

//        if (definitions.length !== words.length) {
//          throw t
//        }

//        return words.map((w, i) => [w, ...definitions[i]])
//      })
//      .flat()
//      .filter((a, i, self) => self.findIndex(b => a[0] === b[0]) === i)
// )