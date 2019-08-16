import { Point } from './geometry';

export interface Options {
  maxRandomnessOffset?: number;
  roughness?: number;
  bowing?: number;
  stroke?: string;
  strokeWidth?: number;
  curveTightness?: number;
  curveStepCount?: number;
  fill?: boolean;
  simplification?: number;
}

export interface ResolvedOptions extends Options {
  maxRandomnessOffset: number;
  roughness: number;
  bowing: number;
  stroke: string;
  strokeWidth: number;
  curveTightness: number;
  curveStepCount: number;
}

const defaultOptions: ResolvedOptions = {
  maxRandomnessOffset: 2,
  roughness: 1,
  bowing: 1,
  stroke: '#000',
  strokeWidth: 1,
  curveTightness: 0,
  curveStepCount: 9,
};

export function _options(options?: Options): ResolvedOptions {
  return options ? Object.assign({}, defaultOptions, options) : defaultOptions;
}

export declare type OpType = 'move' | 'bcurveTo' | 'lineTo' | 'qcurveTo';
export declare type OpSetType = 'path' | 'fillPath' | 'path2Dfill';

export interface Op {
  op: OpType;
  data: number[];
}

export interface OpSet {
  type: OpSetType;
  ops: Op[];
  size?: Point;
  path?: string;
}
