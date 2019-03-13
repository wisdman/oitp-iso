
// function equals(arr1: Array<number>, arr2: Array<number>) {
//   if (arr1.length !== arr2.length) {
//     return false
//   }

//   return arr1.every((v, i) => v === arr2[i])
// }

function unique(arr: Array<Array<number>>): Array<Array<number>> {
  return arr.filter((value, index, self) => self.findIndex((el) => el.every((v, i) => v === value[i])) === index )

}



function permute(permutation: Array<number>) {
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

function chunks(matrix: Array<number>) {
  const N = Math.sqrt(matrix.length)
  return Array.from(Array(Math.ceil(matrix.length/N)), (_,i)=>matrix.slice(i*N,i*N+N))
}

function rotate(input: Array<number>) {
  const matrix = chunks(input)
  const N = matrix.length - 1
  return matrix.map((row, i) => row.map((_, j) => matrix[N - j][i])).flat()
}

function merge(...mtx: Array<Array<number>>) {
  const m = mtx.shift() || []
  return m.map((v, i) => mtx.reduce((p, nv) => p || nv[i], v) || 0)
}

function circle(m1: Array<number>) {
  const m2 = rotate(m1)
  const m3 = rotate(m2)
  const m4 = rotate(m3)
  return merge(m1, m2, m3, m4)
}

function gen31() {
  const m = permute([ 1,2 ])
            .map( v =>
              [ [  v[1], v[0], 0 ],
                [  v[0], v[1], 0 ],
                [     0,    0, 0 ], ].flat()
            ).map( v => circle(v))
  return m
}

function gen32() {
  const m = permute([ 1,1,2 ])
            .map( v =>
              [ [ v[0], v[1], 0 ],
                [ v[2],    0, 0 ],
                [    0,    0, 0 ], ].flat()
            ).map( v => circle(v))
  return m
}

function gen33() {
  const m = permute([ 1,1,2 ])
            .map( v =>
              [ [    0, v[1], 0 ],
                [ v[2], v[0], 0 ],
                [    0,    0, 0 ], ].flat()
            ).map( v => circle(v))
  return m
}

function gen34() {
  const m = []
            .map( () =>
              [ [  1, 2, 1 ],
                [  2, 1, 2 ],
                [  1, 2, 1 ], ].flat()
            ).map( v => circle(v))
  return m
}

function gen35() {
  const m = []
            .map( () =>
              [ [  3, 2, 1 ],
                [  2, 3, 2 ],
                [  1, 2, 3 ], ].flat()
            ).map( v => circle(v))
  return m
}

function gen36() {
  const m = []
            .map( () =>
              [ [  2, 0, 1 ],
                [  2, 3, 1 ],
                [  2, 0, 1 ], ].flat()
            ).map( v => circle(v))
  return m
}

function gen37() {
  const m = []
            .map( () =>
              [ [  2, 3, 1 ],
                [  1, 3, 2 ],
                [  2, 3, 1 ], ].flat()
            ).map( v => circle(v))
  return m
}

function gen38() {
  const m = []
            .map( () =>
              [ [  1, 1, 1 ],
                [  1, 0, 1 ],
                [  1, 1, 1 ], ].flat()
            ).map( v => circle(v))
  return m
}



function gen41() {
  const m = permute([ 1,1,2,2 ])
            .map( v =>
              [ [ v[0], v[1], 0, 0 ],
                [ v[2], v[3], 0, 0 ],
                [    0,    0, 0, 0 ],
                [    0,    0, 0, 0 ], ].flat()
            ).map( v => circle(v))
  return m
}

function gen42() {
  const m = permute([ 1,2,2,3 ])
            .map( v =>
              [ [ v[0], v[1], 0, 0 ],
                [ v[2], v[3], 0, 0 ],
                [    0,    0, 0, 0 ],
                [    0,    0, 0, 0 ], ].flat()
            ).map( v => circle(v))
  return m
}

function gen43() {
  const m = permute([ 1,2,2,0 ])
            .map( v =>
              [ [ v[0], v[1], 0, 0 ],
                [ v[2], v[3], 0, 0 ],
                [    0,    0, 0, 0 ],
                [    0,    0, 0, 0 ], ].flat()
            ).map( v => circle(v))
  return m
}

function gen44() {
  const m = []
            .map( () =>
              [ [2, 1, 0, 0 ],
                [ 1, 2, 0, 0 ],
                [    0,    0, 0, 0 ],
                [    0,    0, 0, 0 ], ].flat()
            ).map( v => circle(v))
  return m
}


function gen45() {
  const m = []
            .map( () =>
              [ [ 2, 1, 0, 0 ],
                [ 1, 2, 0, 0 ],
                [ 0, 0, 2, 3 ],
                [ 0, 0, 3, 2 ], ].flat()
            ).map( v => circle(v))
  return m
}

function gen46() {
  const m = []
            .map( () =>
              [ [ 1, 1, 1, 1 ],
                [ 2, 3, 3, 2 ],
                [ 2, 3, 3, 2 ],
                [ 4, 4, 4, 4 ], ].flat()
            ).map( v => circle(v))
  return m
}

function gen47() {
  const m = []
            .map( () =>
              [ [ 1, 3, 2, 3 ],
                [ 3, 1, 3, 2 ],
                [ 2, 3, 1, 3 ],
                [ 3, 2, 3, 1 ], ].flat()
            ).map( v => circle(v))
  return m
}

function gen48() {
  const m = []
            .map( () =>
              [ [ 1, 3, 1, 3 ],
                [ 3, 2, 3, 2 ],
                [ 1, 3, 1, 3 ],
                [ 3, 2, 3, 2 ], ].flat()
            ).map( v => circle(v))
  return m
}

function gen51() {
  const m = permute([ 1,2,2,3 ])
            .map( v =>
              [ [ v[0], v[1], 0, 0, 0 ],
                [ v[2], v[3], 0, 0, 0 ],
                [    0,    0, 2, 0, 0 ],
                [    0,    0, 0, 0, 0 ],
                [    0,    0, 0, 0, 0 ], ].flat()
            ).map( v => circle(v))
  return m
}

function gen52() {
  const m = permute([ 1,2,2,3 ])
            .map( v =>
              [ [ v[0], v[1], 0, 0, 0 ],
                [ v[2], v[3], 4, 0, 0 ],
                [    0,    4, 0, 4, 0 ],
                [    0,    0, 4, 0, 0 ],
                [    0,    0, 0, 0, 0 ], ].flat()
            ).map( v => circle(v))
  return m
}

function gen53() {
  const m = permute([ 1,2,2 ])
            .map( v =>
              [ [ v[0], v[1], 0, 0, 0 ],
                [ v[2],    0, 0, 0, 0 ],
                [    0,    0, 2, 0, 0 ],
                [    0,    0, 0, 0, 0 ],
                [    0,    0, 0, 0, 0 ], ].flat()
            ).map( v => circle(v))
  return m
}


function gen54() {
  const m = []
            .map( () =>
              [ [    1,  1, 0, 2, 2 ],
                [    2,  2, 0, 1, 1 ],
                [    0,  0, 0, 0, 0 ],
                [    2,  2, 0, 1, 1 ],
                [    1,  1, 0, 2, 2 ], ].flat()
            ).map( v => circle(v))
  return m
}

function gen55() {
  const m = []
            .map( () =>
              [ [    0,  1, 2, 0, 3 ],
                [    1,  2, 0, 3, 0 ],
                [    2,  0, 3, 0, 2 ],
                [    0,  3, 0, 2, 1 ],
                [    3,  0, 2, 1, 0 ], ].flat()
            ).map( v => circle(v))
  return m
}

function gen56() {
  const m = []
            .map( () =>
              [ [    1,  2, 1, 2, 1 ],
                [    2,  1, 2, 1, 2 ],
                [    0,  0, 0, 0, 0 ],
                [    2,  1, 2, 1, 2 ],
                [    1,  2, 1, 2, 1 ], ].flat()
            ).map( v => circle(v))
  return m
}

function gen57() {
  const m = []
            .map( () =>
              [ [    1,  3, 3, 3, 1 ],
                [    3,  1, 1, 1, 3 ],
                [    3,  1, 2, 1, 3 ],
                [    3,  1, 1, 1, 3 ],
                [    1,  3, 3, 3, 1 ], ].flat()
            ).map( v => circle(v))
  return m
}

function gen58() {
  const m = []
            .map( () =>
              [ [    1,  2, 1, 2, 1 ],
                [    2,  1, 3, 1, 2 ],
                [    1,  3, 1, 3, 1 ],
                [    2,  1, 3, 1, 2 ],
                [    1,  2, 1, 2, 1 ], ].flat()
            ).map( v => circle(v))
  return m
}

function gen59() {
  const m = []
            .map( () =>
              [ [    1,  2, 3, 1, 3 ],
                [    1,  2, 3, 1, 3 ],
                [    1,  3, 2, 1, 2 ],
                [    1,  3, 2, 1, 2 ],
                [    1,  2, 3, 1, 3 ], ].flat()
            ).map( v => circle(v))
  return m
}

export function getMatrix(i: number) {
  let arr: Array<Array<number>>

  switch (i) {
    case 2:
      arr = permute([ 1,1,2,2 ])
      return unique(arr)
      break;

     case 3:
      return unique([...gen31(), ...gen32(), ...gen33(), ...gen34(), ...gen35(), ...gen36(), ...gen37(), ...gen38()])
      break;

    case 4:
      return unique([...gen41(), ...gen42(), ...gen43(), ...gen44(), ...gen45(), ...gen46(), ...gen47(), ...gen48()])
      break;

    case 5:
      return unique([...gen51(), ...gen52(), ...gen53(), ...gen54(), ...gen55(), ...gen56(), ...gen57(), ...gen58(), ...gen59()])
      break;
  }

  return [[1]]
}