import React from 'react';
import { useState } from 'react';

import RulerItem, { ItemDirection, MouseData } from './components/RulerItem/RulerItem';
import RulerLines from './components/RulerLines/RulerLine';
import { HRulerWrap, Indicator, RulerWrap, VRulerWrap } from './styled';

interface LinInfo {
  show: boolean;
  value: number;
  lineList: number[] | [];
}

interface RulerItemInfo {
  [ItemDirection.HORIZONTAL]: LinInfo;
  [ItemDirection.VERTICAL]: LinInfo;
}

const Ruler = () => {
  const [rulerItemInfo, setRulerItemInfo] = useState<RulerItemInfo>({
    [ItemDirection.HORIZONTAL]: {
      show: false,
      value: 0,
      lineList: [],
    },
    [ItemDirection.VERTICAL]: {
      show: false,
      value: 0,
      lineList: [],
    },
  });
  const handleMouseEnter = (data: MouseData) => {
    const { direction, x, y } = data;
    if (direction === ItemDirection.HORIZONTAL) {
      setRulerItemInfo({
        ...rulerItemInfo,
        [ItemDirection.HORIZONTAL]: {
          show: true,
          value: x,
          lineList: rulerItemInfo[ItemDirection.HORIZONTAL].lineList,
        },
      });
    } else {
      setRulerItemInfo({
        ...rulerItemInfo,
        [ItemDirection.VERTICAL]: {
          show: true,
          value: y,
          lineList: rulerItemInfo[ItemDirection.VERTICAL].lineList,
        },
      });
    }
  };
  const handleMouseLeave = (data: MouseData) => {
    const { direction } = data;
    if (direction === ItemDirection.HORIZONTAL) {
      setRulerItemInfo({
        ...rulerItemInfo,
        [ItemDirection.HORIZONTAL]: {
          show: false,
          value: -1,
          lineList: rulerItemInfo[ItemDirection.HORIZONTAL].lineList,
        },
      });
    } else {
      setRulerItemInfo({
        ...rulerItemInfo,
        [ItemDirection.VERTICAL]: {
          show: false,
          value: -1,
          lineList: rulerItemInfo[ItemDirection.VERTICAL].lineList,
        },
      });
    }
  };

  const handleMouseMove = (data: MouseData) => {
    const { direction, x, y } = data;
    if (direction === ItemDirection.HORIZONTAL) {
      setRulerItemInfo({
        ...rulerItemInfo,
        [ItemDirection.HORIZONTAL]: {
          show: true,
          value: x,
          lineList: rulerItemInfo[ItemDirection.HORIZONTAL].lineList,
        },
      });
    } else {
      setRulerItemInfo({
        ...rulerItemInfo,
        [ItemDirection.VERTICAL]: {
          show: true,
          value: y - 65,
          lineList: rulerItemInfo[ItemDirection.VERTICAL].lineList,
        },
      });
    }
  };

  const handleClick = (data: MouseData) => {
    const { direction, x, y } = data;
    if (direction === ItemDirection.HORIZONTAL) {
      setRulerItemInfo({
        ...rulerItemInfo,
        [ItemDirection.HORIZONTAL]: {
          show: true,
          value: x,
          lineList: [...rulerItemInfo[ItemDirection.HORIZONTAL].lineList, x],
        },
      });
    } else {
      setRulerItemInfo({
        ...rulerItemInfo,
        [ItemDirection.VERTICAL]: {
          show: true,
          value: y - 65,
          lineList: [...rulerItemInfo[ItemDirection.VERTICAL].lineList, y - 64],
        },
      });
    }
  };

  const indicatorStyles = () => {
    const styles = {} as React.CSSProperties;
    if (rulerItemInfo[ItemDirection.HORIZONTAL].show) {
      styles['left'] = rulerItemInfo[ItemDirection.HORIZONTAL].value;
      styles['height'] = '100%';
    } else {
      styles['top'] = rulerItemInfo[ItemDirection.VERTICAL].value;
      styles['width'] = '100%';
    }
    return {
      display:
        rulerItemInfo[ItemDirection.HORIZONTAL].show || rulerItemInfo[ItemDirection.VERTICAL].show
          ? 'block'
          : 'none',
      ...styles,
    };
  };

  return (
    <RulerWrap>
      <HRulerWrap>
        <RulerItem
          size={1000}
          direction={ItemDirection.HORIZONTAL}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        ></RulerItem>
        <RulerLines
          direction={ItemDirection.HORIZONTAL}
          lineList={rulerItemInfo[ItemDirection.HORIZONTAL].lineList}
        ></RulerLines>
      </HRulerWrap>
      <VRulerWrap>
        <RulerItem
          size={1000}
          direction={ItemDirection.VERTICAL}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        ></RulerItem>
        <RulerLines
          direction={ItemDirection.VERTICAL}
          lineList={rulerItemInfo[ItemDirection.VERTICAL].lineList}
        ></RulerLines>
      </VRulerWrap>
      <Indicator
        style={{
          ...indicatorStyles(),
        }}
      ></Indicator>
    </RulerWrap>
  );
};

export default React.memo(Ruler);
