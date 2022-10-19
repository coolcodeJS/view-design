import { createElement } from './dom';

export const createCanvas = (width: number, height: number) => {
  const canvas = createElement('canvas') as HTMLCanvasElement;
  canvas.width = width;
  canvas.height = height;
  return canvas;
};
