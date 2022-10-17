import useWindowClientInfo from '@/hooks/useWindowClientInfo';
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
import { LineItem } from './type';

interface LinInfo {
  show: boolean;
  value: number;
  lineList: LineItem[];
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

  const { height: clientHeight, width: clientWidth } = useWindowClientInfo();
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
          lineList: [
            ...rulerItemInfo[ItemDirection.HORIZONTAL].lineList,
            {
              value: x - 20,
              direction: ItemDirection.HORIZONTAL,
            },
          ],
        },
      });
    } else {
      setRulerItemInfo({
        ...rulerItemInfo,
        [ItemDirection.VERTICAL]: {
          show: true,
          value: y - 65 - 20,
          lineList: [
            ...rulerItemInfo[ItemDirection.VERTICAL].lineList,
            {
              value: y - 64 - 20,
              direction: ItemDirection.VERTICAL,
            },
          ],
        },
      });
    }
  };

  const indicatorStyles = () => {
    const styles = {} as React.CSSProperties;
    if (rulerItemInfo[ItemDirection.HORIZONTAL].show) {
      styles['left'] = rulerItemInfo[ItemDirection.HORIZONTAL].value;
      styles['height'] = '100vh';
    } else {
      styles['top'] = rulerItemInfo[ItemDirection.VERTICAL].value + 20;
      styles['width'] = '100vw';
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
            size={clientWidth - 20}
            direction={ItemDirection.HORIZONTAL}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
          ></RulerItem>
          {showLines ? (
            <RulerLines lineList={rulerItemInfo[ItemDirection.HORIZONTAL].lineList}></RulerLines>
          ) : null}
        </HRulerWrap>
        <VRulerWrap>
          <RulerItem
            size={clientHeight - 20}
            direction={ItemDirection.VERTICAL}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onClick={handleClick}
          ></RulerItem>
          {showLines ? (
            <RulerLines lineList={rulerItemInfo[ItemDirection.VERTICAL].lineList}></RulerLines>
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
