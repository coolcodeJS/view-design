import React from 'react';
import { useState, useEffect } from 'react';
import { Indicator, RulerWrap, LineWrap, HRulerWrap } from './styled';

const LINE_SPACE = 5;
const STAGE_WIDTH = 1000;
const STAGE_HEIGHT = 21;
const LONG_LINE = 18;
const MID_LINE = 13;
const SHORT_LINE = 10;

interface LinInfo {
  show: boolean;
  x: number;
}

const Ruler = () => {
  const [lineInfo, setLineInfo] = useState<LinInfo>({
    show: false,
    x: 0,
  });
  const [lineList, setLineList] = useState<number[] | []>([]);
  const addLine = () => {
    setLineList([...lineList, lineInfo.x]);
  };
  const renderRuleCanvas = () => {
    const lineCount = Math.floor(STAGE_WIDTH / LINE_SPACE);
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000';
    for (let i = 0; i < lineCount; i++) {
      ctx.beginPath();
      ctx.moveTo(i * LINE_SPACE, 0);
      ctx.fillStyle = '#000';
      ctx.font = '10px serif';
      ctx.lineTo(i * LINE_SPACE, i % 10 === 0 ? LONG_LINE : i % 5 === 0 ? MID_LINE : SHORT_LINE);
      if (i % 10 === 0) {
        ctx.fillText(i * LINE_SPACE * 2 + '', i * LINE_SPACE + 2, LONG_LINE + 2);
      }
      ctx.stroke();
      ctx.closePath();
    }
  };

  const line = (e: React.MouseEvent) => {
    setLineInfo({
      show: true,
      x: e.clientX,
    });
  };

  useEffect(() => {
    renderRuleCanvas();
  }, []);

  return (
    <RulerWrap>
      <HRulerWrap id="rule-h">
        <canvas
          id="canvas"
          width={STAGE_WIDTH}
          onDoubleClick={() => addLine()}
          onMouseMove={line}
          onMouseEnter={() => {
            setLineInfo({
              ...lineInfo,
              show: true,
            });
          }}
          onMouseLeave={() => {
            setLineInfo({
              ...lineInfo,
              show: false,
            });
          }}
          height={STAGE_HEIGHT}
        ></canvas>
      </HRulerWrap>
      <LineWrap>
        {lineList.map((item, index) => {
          return <Indicator key={index} style={{ left: item }}></Indicator>;
        })}
      </LineWrap>
      <Indicator
        style={{ display: lineInfo.show ? 'block' : 'none', left: lineInfo.x }}
      ></Indicator>
    </RulerWrap>
  );
};

export default React.memo(Ruler);
