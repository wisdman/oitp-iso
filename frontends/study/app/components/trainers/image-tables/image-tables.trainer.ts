import { Component } from "@angular/core"

import { SHAPES } from "./icons"

@Component({
  selector: "image-tables-trainer",
  templateUrl: "./image-tables.trainer.html",
  styleUrls: [ "./image-tables.trainer.css" ],
})
export class ImageTablesTrainer {

  icons: boolean = true

  permute(permutation: Array<number>) {
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

  chunks(matrix: Array<number>) {
    const N = Math.sqrt(matrix.length)
    return Array.from(Array(Math.ceil(matrix.length/N)), (_,i)=>matrix.slice(i*N,i*N+N))
  }

  rotate(input: Array<number>) {
    const matrix = this.chunks(input)
    const N = matrix.length - 1
    return matrix.map((row, i) => row.map((_, j) => matrix[N - j][i])).flat()
  }

  MATRIXS: Array<{ matrix: Array<{v: number, icon: string}>, n: number}> = []

  out(...mtx: Array<Array<number>>) {
    mtx.forEach(matrix => {

      const max = Math.max(...matrix)
      const ICONS = SHAPES.sort(() => Math.random() - 0.5).slice(0, max+1)

      const n = Math.sqrt(matrix.length)
      this.MATRIXS.push({matrix: matrix.map(v => ({ v, icon: ICONS[v] })), n})
    })
  }

  merge(...mtx: Array<Array<number>>) {
    const m = mtx.shift() || []
    return m.map((v, i) => mtx.reduce((p, nv) => p || nv[i], v) || 0)
  }

  circle(m1: Array<number>) {
    const m2 = this.rotate(m1)
    const m3 = this.rotate(m2)
    const m4 = this.rotate(m3)
    return this.merge(m1, m2, m3, m4)
  }

  gen2() {
    const m = this.permute([ 1,1,2,2 ])
                  .map( v =>
                    [ [ v[0], v[1], 0, 0 ],
                      [ v[2], v[3], 0, 0 ],
                      [    0,    0, 0, 0 ],
                      [    0,    0, 0, 0 ], ].flat()
                  ).map( v => this.circle(v))
    this.out(...m)
  }

  gen3() {

    const m = this.permute([ 1,2,2,3 ])
                  .map( v =>
                    [ [ v[0], v[1], 0, 0 ],
                      [ v[2], v[3], 0, 0 ],
                      [    0,    0, 0, 0 ],
                      [    0,    0, 0, 0 ], ].flat()
                  ).map( v => this.circle(v))
    this.out(...m)
  }

  gen4() {

    const m = this.permute([ 1,2,2,3 ])
                  .map( v =>
                    [ [ v[0], v[1], 4, 0, 0 ],
                      [ v[2], v[3], 4, 0, 0 ],
                      [    0,    0, 0, 0, 0 ],
                      [    0,    0, 0, 0, 0 ],
                      [    0,    0, 0, 0, 0 ], ].flat()
                  ).map( v => this.circle(v))
    this.out(...m)
  }

  gen5() {

    const m = this.permute([ 1,2,2,3 ])
                  .map( v =>
                    [ [ v[0], v[1], 0, 0, 0 ],
                      [ v[2], v[3], 4, 0, 0 ],
                      [    0,    4, 5, 4, 0 ],
                      [    0,    0, 4, 0, 0 ],
                      [    0,    0, 0, 0, 0 ], ].flat()
                  ).map( v => this.circle(v))
    this.out(...m)
  }

  gen6() {

    const m = this.permute([ 1,2,2,3 ])
                  .map( v =>
                    [ [ v[0], v[1], 4, 0, 0 ],
                      [ v[2], v[3], 4, 0, 0 ],
                      [    0,    0, 2, 0, 0 ],
                      [    0,    0, 0, 0, 0 ],
                      [    0,    0, 0, 0, 0 ], ].flat()
                  ).map( v => this.circle(v))
    this.out(...m)
  }

  constructor() {
    this.gen2()
    this.gen3()
    this.gen4()
    this.gen5()
    this.gen6()
  }
}
