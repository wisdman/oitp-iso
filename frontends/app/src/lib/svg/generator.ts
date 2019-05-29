import { Options, OpSet, _options } from './core';
import { Point } from './geometry.js';
import { line, solidFillPolygon, rectangle, ellipse, linearPath, arc, curve, svgPath } from './renderer.js';

export function opsToPath(drawing: OpSet): string {
  let path = '';
  for (const item of drawing.ops) {
    const data = item.data;
    switch (item.op) {
      case 'move':
        path += `M${data[0]} ${data[1]} `;
        break;
      case 'bcurveTo':
        path += `C${data[0]} ${data[1]}, ${data[2]} ${data[3]}, ${data[4]} ${data[5]} `;
        break;
      case 'qcurveTo':
        path += `Q${data[0]} ${data[1]}, ${data[2]} ${data[3]} `;
        break;
      case 'lineTo':
        path += `L${data[0]} ${data[1]} `;
        break;
    }
  }
  return path.trim();
}

export function genLine(x1: number, y1: number, x2: number, y2: number, options?: Options): OpSet[] {
  const o = _options(options);
  return [line(x1, y1, x2, y2, o)]
}

export function genRectangle(x: number, y: number, width: number, height: number, options?: Options): OpSet[] {
  const o = _options(options);
  const paths = [];
  if (o.fill) {
    const points: Point[] = [[x, y], [x + width, y], [x + width, y + height], [x, y + height]];
    paths.push(solidFillPolygon(points, o));
  }
  paths.push(rectangle(x, y, width, height, o));
  return paths
}

export function genEllipse(x: number, y: number, width: number, height: number, options?: Options): OpSet[] {
  const o = _options(options);
  const paths = [];
  if (o.fill) {
    const shape = ellipse(x, y, width, height, o);
    shape.type = 'fillPath';
    paths.push(shape);
  }
  paths.push(ellipse(x, y, width, height, o));
  return paths
}

export function genCircle(x: number, y: number, diameter: number, options?: Options): OpSet[] {
  return genEllipse(x, y, diameter, diameter, options);
}

export function genLinearPath(points: Point[], options?: Options): OpSet[] {
  const o = _options(options);
  return [linearPath(points, false, o)]
}

export function genArc(x: number, y: number, width: number, height: number, start: number, stop: number, closed: boolean = false, options?: Options): OpSet[] {
  const o = _options(options);
  const paths = [];
  if (closed && o.fill) {
    const shape = arc(x, y, width, height, start, stop, true, false, o);
    shape.type = 'fillPath';
    paths.push(shape);
  }
  paths.push(arc(x, y, width, height, start, stop, closed, true, o));
  return paths
}

export function genCurve(points: Point[], options?: Options): OpSet[] {
  const o = _options(options);
  return [curve(points, o)]
}

export function genPolygon(points: Point[], options?: Options): OpSet[] {
  const o = _options(options);
  const paths = [];
  if (o.fill) {
    paths.push(solidFillPolygon(points, o));
  }
  paths.push(linearPath(points, true, o));
  return paths
}

export function genPath(d: string, options?: Options): OpSet[] {
  const o = _options(options);
  const paths: OpSet[] = [];
  if (!d) {
    return paths
  }
  if (o.fill) {
    const shape: OpSet = { type: 'path2Dfill', path: d, ops: [] };
    paths.push(shape);
  }
  paths.push(svgPath(d, o));
  return paths
}
