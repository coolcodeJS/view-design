import React, { useEffect, useRef } from 'react';
import { Canvas } from './styled';

export enum ItemDirection {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

export interface MouseData {
  x: number;
  y: number;
  direction: ItemDirection.HORIZONTAL | ItemDirection.VERTICAL;
}

interface IProps {
  size: number;
  direction: ItemDirection.HORIZONTAL | ItemDirection.VERTICAL;
  onClick?: (data: MouseData) => void;
  onMouseEnter?: (data: MouseData) => void;
  onMouseMove?: (data: MouseData) => void;
  onMouseLeave?: (data: MouseData) => void;
}
const LINE_SPACE = 10;
const STAGE_WIDTH = 21;
const LONG_LINE = 18;
const MID_LINE = 13;
const SHORT_LINE = 10;
const LINE_COLOR = '#000';

const RulerItem: React.FC<IProps> = (props) => {
  const { direction, onClick, size, onMouseEnter, onMouseMove, onMouseLeave } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const renderRulerH = () => {
    if (!canvasRef.current) return;
    const lineCount = Math.floor(size / LINE_SPACE);
    const canvas = canvasRef.current;
    canvas.height = STAGE_WIDTH;
    canvas.width = size;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.lineWidth = 1;
    ctx.strokeStyle = LINE_COLOR;
    for (let i = 0; i < lineCount; i++) {
      ctx.beginPath();
      ctx.moveTo(i * LINE_SPACE, 0);
      ctx.fillStyle = LINE_COLOR;
      ctx.font = '10px serif';
      ctx.lineTo(i * LINE_SPACE, i % 10 === 0 ? LONG_LINE : i % 5 === 0 ? MID_LINE : SHORT_LINE);
      if (i % 10 === 0) {
        ctx.fillText(i * LINE_SPACE + '', i * LINE_SPACE + 2, LONG_LINE + 2);
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  const renderRulerV = () => {
    if (!canvasRef.current) return;
    const lineCount = Math.floor(size / LINE_SPACE);
    const canvas = canvasRef.current;
    canvas.height = size;
    canvas.width = STAGE_WIDTH;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.lineWidth = 1;
    ctx.strokeStyle = LINE_COLOR;
    for (let i = 0; i < lineCount; i++) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, i * LINE_SPACE);
      ctx.fillStyle = LINE_COLOR;
      ctx.font = '10px serif';
      ctx.lineTo(i % 10 === 0 ? LONG_LINE : i % 5 === 0 ? MID_LINE : SHORT_LINE, i * LINE_SPACE);
      if (i % 10 === 0) {
        ctx.translate(SHORT_LINE + 2, i * LINE_SPACE + 2);
        ctx.rotate((Math.PI / 180) * 90);
        ctx.fillText(i * LINE_SPACE + '', 0, 0);
      }
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }
  };

  useEffect(() => {
    if (direction === ItemDirection.VERTICAL) {
      renderRulerV();
    } else {
      renderRulerH();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction, size]);

  const handleClick = (e: React.MouseEvent) => {
    onClick &&
      onClick({
        x: e.clientX,
        y: e.clientY,
        direction,
      });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    onMouseMove &&
      onMouseMove({
        x: e.clientX,
        y: e.clientY,
        direction,
      });
  };
  const handleMouseEnter = (e: React.MouseEvent) => {
    onMouseEnter &&
      onMouseEnter({
        x: e.clientX,
        y: e.clientY,
        direction,
      });
  };
  const handleMouseLeave = (e: React.MouseEvent) => {
    onMouseLeave &&
      onMouseLeave({
        x: e.clientX,
        y: e.clientY,
        direction,
      });
  };

  return (
    <>
      <Canvas
        ref={canvasRef}
        onDoubleClick={(e) => {
          handleClick(e);
        }}
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseEnter={(e) => handleMouseEnter(e)}
        onMouseLeave={(e) => handleMouseLeave(e)}
      ></Canvas>
    </>
  );
};

export default React.memo(RulerItem);
