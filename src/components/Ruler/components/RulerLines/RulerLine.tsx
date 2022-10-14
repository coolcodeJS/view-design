import React from 'react';

import { Indicator } from '../../styled';
import { ItemDirection } from '../RulerItem/RulerItem';
import { LineWrap } from './styled';

interface IProps {
  lineList: number[] | [];
  direction: ItemDirection.HORIZONTAL | ItemDirection.VERTICAL;
}

const RulerLines = (props: IProps) => {
  const { lineList = [], direction } = props;
  const indicatorStyles = (value: number) => {
    const styles = {} as React.CSSProperties;
    if (direction === ItemDirection.HORIZONTAL) {
      styles['left'] = value;
      styles['height'] = '100%';
    } else {
      styles['top'] = value;
      styles['width'] = '100%';
    }
    return {
      ...styles,
    };
  };
  return (
    <LineWrap>
      {lineList.map((item, index) => {
        return <Indicator key={index} style={{ ...indicatorStyles(item) }}></Indicator>;
      })}
    </LineWrap>
  );
};

export default React.memo(RulerLines);
