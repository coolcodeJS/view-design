import useWindowClientInfo from '@/hooks/useWindowClientInfo';
import { cloneDeep } from 'lodash';
import React, { useEffect } from 'react';
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
import { LineEventData, LineItem } from './type';

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

  const [dragLineInfo, setDragLineInfo] = useState<LineEventData>({
    index: -1,
    direction: ItemDirection.HORIZONTAL,
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

  const handleDelete = (data: LineEventData) => {
    const { direction, index } = data;
    if (direction === ItemDirection.HORIZONTAL) {
      const originData = cloneDeep(rulerItemInfo[ItemDirection.HORIZONTAL]);
      originData.lineList.splice(index, 1);
      setRulerItemInfo({
        ...rulerItemInfo,
        [ItemDirection.HORIZONTAL]: { ...cloneDeep(originData) },
      });
    } else {
      const originData = cloneDeep(rulerItemInfo[ItemDirection.VERTICAL]);
      originData.lineList.splice(index, 1);
      setRulerItemInfo({
        ...rulerItemInfo,
        [ItemDirection.VERTICAL]: { ...cloneDeep(originData) },
      });
    }
  };

  const handleLineDown = (data: LineEventData) => {
    setDragLineInfo({
      ...data,
    });
  };

  const handleLineMove = (e: MouseEvent) => {
    const { direction, index } = dragLineInfo;
    if (dragLineInfo.index === -1) return;
    const { width, height } = document.documentElement.getBoundingClientRect();
    const { clientX, clientY } = e;
    if (direction === ItemDirection.HORIZONTAL) {
      console.log(
        clientX - 20 < 0 ? 0 : clientX - 20 > width ? width - 20 : clientX - 20 - 2,
        width,
      );
      const originData = cloneDeep(rulerItemInfo[ItemDirection.HORIZONTAL]);
      originData.lineList[index] = {
        value: clientX - 20 < 0 ? 0 : clientX - 20 > width ? width - 20 : clientX - 20 - 2,
        direction: ItemDirection.HORIZONTAL,
      };
      setRulerItemInfo({
        ...rulerItemInfo,
        [ItemDirection.HORIZONTAL]: { ...cloneDeep(originData) },
      });
    } else {
      const originData = cloneDeep(rulerItemInfo[ItemDirection.VERTICAL]);
      originData.lineList.splice(index, 1);
      originData.lineList[index] = {
        value:
          clientY - 64 - 20 < 0
            ? 0
            : clientY - 64 - 20 > height - 64 - 20
            ? height - 64 - 20 - 2
            : clientY - 64 - 20,
        direction: ItemDirection.VERTICAL,
      };
      setRulerItemInfo({
        ...rulerItemInfo,
        [ItemDirection.VERTICAL]: { ...cloneDeep(originData) },
      });
    }
  };

  const handleLineUp = (e?: MouseEvent | null, data?: LineEventData) => {
    console.log(e, data);
    setDragLineInfo({
      index: -1,
      direction: ItemDirection.HORIZONTAL,
    });
  };

  const indicatorStyles = () => {
    const styles = {} as React.CSSProperties;
    if (rulerItemInfo[ItemDirection.HORIZONTAL].show) {
      styles['left'] = rulerItemInfo[ItemDirection.HORIZONTAL].value;
      styles['height'] = '100vh';
      styles['width'] = '2px';
    } else {
      styles['top'] = rulerItemInfo[ItemDirection.VERTICAL].value + 20;
      styles['width'] = '100vw';
      styles['height'] = '2px';
    }
    return {
      display:
        rulerItemInfo[ItemDirection.HORIZONTAL].show || rulerItemInfo[ItemDirection.VERTICAL].show
          ? 'block'
          : 'none',
      ...styles,
    };
  };

  useEffect(() => {
    document.documentElement.addEventListener('mousemove', handleLineMove);
    document.documentElement.addEventListener('mouseup', handleLineUp);
    return () => {
      document.documentElement.removeEventListener('mousemove', handleLineMove);
      document.documentElement.removeEventListener('mouseup', handleLineUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragLineInfo]);

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
            <RulerLines
              lineList={rulerItemInfo[ItemDirection.HORIZONTAL].lineList}
              onDelete={handleDelete}
              onMouseDown={handleLineDown}
              onMouseUp={(data) => handleLineUp(null, data)}
            ></RulerLines>
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
            <RulerLines
              lineList={rulerItemInfo[ItemDirection.VERTICAL].lineList}
              onDelete={handleDelete}
              onMouseDown={handleLineDown}
              onMouseUp={(data) => handleLineUp(null, data)}
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
