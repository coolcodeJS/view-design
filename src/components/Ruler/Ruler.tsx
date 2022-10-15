import React from 'react';
import { useState } from 'react';

import RulerItem, { ItemDirection, MouseData } from './components/RulerItem/RulerItem';
import RulerLines from './components/RulerLines/RulerLine';
import {
  ChildrenWrap,
  HRulerWrap,
  Indicator,
  RulerLayerWrap,
  RulerWrap,
  ShowBtn,
  VRulerWrap,
} from './styled';

interface LinInfo {
  show: boolean;
  value: number;
  lineList: number[] | [];
}

interface RulerItemInfo {
  [ItemDirection.HORIZONTAL]: LinInfo;
  [ItemDirection.VERTICAL]: LinInfo;
}

interface IProps {
  children?: React.ReactNode;
}

const Ruler = (props: IProps) => {
  const { children } = props;
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

  const [showLines, setShowLines] = useState<boolean>(true);

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
          value: y - 65 - 20,
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
          lineList: [...rulerItemInfo[ItemDirection.HORIZONTAL].lineList, x - 20],
        },
      });
    } else {
      setRulerItemInfo({
        ...rulerItemInfo,
        [ItemDirection.VERTICAL]: {
          show: true,
          value: y - 65 - 20,
          lineList: [...rulerItemInfo[ItemDirection.VERTICAL].lineList, y - 64 - 20],
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
      styles['top'] = rulerItemInfo[ItemDirection.VERTICAL].value + 20;
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
    <RulerLayerWrap>
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
          {showLines ? (
            <RulerLines
              direction={ItemDirection.HORIZONTAL}
              lineList={rulerItemInfo[ItemDirection.HORIZONTAL].lineList}
            ></RulerLines>
          ) : null}
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
          {showLines ? (
            <RulerLines
              direction={ItemDirection.VERTICAL}
              lineList={rulerItemInfo[ItemDirection.VERTICAL].lineList}
            ></RulerLines>
          ) : null}
        </VRulerWrap>
        <ShowBtn
          onClick={() => {
            setShowLines(!showLines);
          }}
        ></ShowBtn>
        <Indicator
          style={{
            ...indicatorStyles(),
          }}
        ></Indicator>
      </RulerWrap>
      <ChildrenWrap>{children}</ChildrenWrap>
    </RulerLayerWrap>
  );
};

export default React.memo(Ruler);
