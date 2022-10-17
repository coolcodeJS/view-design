import React from 'react';
import { LineItem } from '../../type';
import Line from '../Line/Line';
import { LineWrap } from './styled';

interface IProps {
  lineList: LineItem[];
}

const RulerLines: React.FC<IProps> = (props) => {
  const { lineList = [] } = props;

  return (
    <LineWrap>
      {lineList.map((item: LineItem, index) => {
        return <Line key={index} {...item}></Line>;
      })}
    </LineWrap>
  );
};

export default React.memo(RulerLines);
