import React from 'react';
import { LineEventData, LineItem } from '../../type';
import Line from '../Line/Line';
import { LineWrap } from './styled';

interface IProps {
  lineList: LineItem[];
  onDelete: (data: LineEventData) => void;
  onMouseDown?: (data: LineEventData) => void;
  onMouseUp?: (data: LineEventData) => void;
}

const RulerLines: React.FC<IProps> = (props) => {
  const { lineList = [], onDelete, onMouseDown, onMouseUp } = props;

  const handleMouseDown = (data: LineEventData) => {
    onMouseDown && onMouseDown(data);
  };

  const handleMouseUp = (data: LineEventData) => {
    onMouseUp && onMouseUp(data);
  };

  return (
    <LineWrap>
      {lineList.map((item: LineItem, index) => {
        return (
          <Line
            key={index}
            {...item}
            onDelete={() => onDelete({ index, direction: item.direction })}
            onMouseDown={() => handleMouseDown({ index, direction: item.direction })}
            onMouseUp={() => handleMouseUp({ index, direction: item.direction })}
          ></Line>
        );
      })}
    </LineWrap>
  );
};

export default React.memo(RulerLines);
