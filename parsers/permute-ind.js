
function permute(permutation) {
  var length = permutation.length,
      result = [permutation.slice()],
      c = new Array(length).fill(0),
      i = 1, k, p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}

function compareM(A, B) {
  if (A.length !== B.length) {
    return false
  }

  const muta = permute(A.filter((v, idx, self) => idx === self.indexOf(v)))
                .map( U => A.map(v => U[v]))

  label2:
  for (let MA of muta) {
    for (let i = 0; i < MA.length; i++) {
      if (MA[i] !== B[i]) {
        continue label2
      }
    }
    return true
  }

  return false
}


const file = process.argv[2]

if (file === undefined) {
  console.error("No file")
  return process.exit(1)
}

let patterns = require(file)

for (let M of patterns) {
  P = permute(M.filter((v, idx, self) => idx === self.indexOf(v)))
  const arr = []
  for (let U of P) {
    arr.push(M.map(v => U[v]))
  }
  console.log(arr.length)
}


// patterns = patterns.map(M => permute(M.filter((v, idx, self) => idx === self.indexOf(v))).map( U => M.map(v => U[v])) )


// console.log(patterns.length)
// console.log(patterns.flat().length)