const FS = require("fs")

function chunks(matrix) {
  const N = Math.sqrt(matrix.length)
  return Array.from(Array(Math.ceil(matrix.length/N)), (_,i)=>matrix.slice(i*N,i*N+N))
}

function rotate(input) {
  const matrix = chunks(input)
  const N = matrix.length - 1
  return matrix.map((row, i) => row.map((_, j) => matrix[N - j][i])).flat()
}

function mirror(input) {
  const matrix = chunks(input)
  return matrix.map(row => row.reverse()).flat()
}

function outMatrix(input) {
  const matrix = chunks(input)
  console.log("---")
  console.log(matrix.join("\n"))
}

function compare(A, B) {
  if (A.length !== B.length) {
    return false
  }

  for (let i = 0; i < A.length; i++)
    if (A[i] !== B[i])
      return false

  return true
}

let patterns = require("./patterns-ind.json")

patterns = patterns.map(matrix =>{
  const U = []
  return matrix.map((value) => {
                    let idx = U.indexOf(value)
                    if (idx < 0) {
                      U.push(value)
                      idx = U.indexOf(value)
                    }
                    return idx
                  })
})
.filter(A => Math.sqrt(A.length) % 1 === 0)
.filter( (A, idx, self) => {
  return idx === self.findIndex(B => compare(A, B))
})
.sort((A,B) => A.length < B.length ? -1 : 1)

FS.writeFileSync("ind.json", JSON.stringify(patterns))
