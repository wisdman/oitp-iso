
// ======= Random functions ======

export function RandomInt(min: number = 0, max?: number) {
  if (max === undefined) {
    max = min
    min = 0
  }
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function RandomBoolean() {
  return RandomInt(0, 1) === 1
}


// ======= Array functions ======

export function ShuffleArray<T>(arr: Array<T>, copy: boolean = true): Array<T> {
  return copy ? ShuffleArray(Array.from(arr), false) : arr.sort(() => Math.random() - 0.5)
}

export function NewIntArray(length: number, start: number = 0) {
  return  Array.from(Array(length), (_, i) => start+i)
}

export function NewValueArray<T>(
  length: number,
  value: ((i: number) => T) | Array<T> | T,
): Array<T> {
  if (value instanceof Function) {
    return Array.from(Array(length), (_, i) => value(i))
  }

  if (Array.isArray(value)) {
    const repeat = Math.ceil(length / value.length)
    return Array.from(Array(repeat), () => value).flat().slice(0, length)
  }

  return Array.from(Array(length), () => value)
}


// ======= Geometric functions ======

export function SVGPolygon(vertex: number, radius: number = 50): Array<Array<number>> {
  const degreesToRadians = (angleInDegrees: number) => (Math.PI * angleInDegrees) / 180

  const angle = 360 / vertex
  const offset = degreesToRadians(90 - ((180 - angle) / 2))
  return Array.from(Array(vertex), (_, i) => ({ theta: offset + degreesToRadians(angle * i), r: radius }))
       .map(({ r, theta }) => [
          r + r * Math.cos(theta),
          r + r * Math.sin(theta),
       ])
  // console.dir(points)

  // return `<polygon points="${points.join(' ')}" />`;
}






// const sideCountEl = document.querySelector('#js-side-count');
// const radiusEl = document.querySelector('#js-radius');
// const cxEl = document.querySelector('#js-cx');
// const cyEl = document.querySelector('#js-cy');
// const generateEl = document.querySelector('#js-generate');
// const polygonEl = document.querySelector('#js-polygon');
// const resultEl = document.querySelector('#js-result');
// const svgEl = document.querySelector('#js-svg');

// function pts(sideCount, radius) {
//   const angle = 360 / sideCount;
//   const vertexIndices = range(sideCount);
//   const offsetDeg = 90 - ((180 - angle) / 2);
//   const offset = degreesToRadians(offsetDeg);

//   return vertexIndices.map((index) => {
//     return {
//       theta: offset + degreesToRadians(angle * index),
//       r: radius,
//     };
//   });
// }

// function range(count) {
//   return ;
// }




// function polygon([cx, cy], sideCount, radius) {
//   return pts(sideCount, radius)
//     .map(({ r, theta }) => [
//       cx + r * Math.cos(theta),
//       cy + r * Math.sin(theta),
//     ])
//     .join(' ');
// }

// function generatePolygon() {
//   const sideCount = +sideCountEl.value;
//   const radius = +radiusEl.value;
//   const cx = +cxEl.value;
//   const cy = +cyEl.value;
//   const s = 2 * radius + 50;

//   const res = polygon([cx, cy], sideCount, radius);
//   const viz = polygon([s / 2, s / 2], sideCount, radius);

//   svgEl.setAttribute('viewBox', `0 0 ${s} ${s}`);
//   polygonEl.setAttribute('points', viz);
//   resultEl.innerText = `<polygon points="${res}" />`;
// }

// generateEl.onclick = generatePolygon;
// window.onload = generatePolygon;