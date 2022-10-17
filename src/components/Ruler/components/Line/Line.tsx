import React from 'react';
import { Direction } from '../../type';
import { ItemDirection } from '../RulerItem/RulerItem';
import { DeleteBtn, FlexBox, LineBox, LineToolTip } from './styled';

interface IProps extends Direction {
  value: number;
  onDelete?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
}

const Line: React.FC<IProps> = (props) => {
  const { value, direction, onDelete, onMouseDown, onMouseUp } = props;
  const lineStyles = () => {
    const styles = {} as React.CSSProperties;
    if (direction === ItemDirection.HORIZONTAL) {
      styles['left'] = value;
      styles['top'] = 0;
      styles['height'] = '100vh';
      styles['width'] = '2px';
    } else {
      styles['left'] = 0;
      styles['top'] = value;
      styles['width'] = '100vw';
      styles['height'] = '2px';
    }
    return {
      ...styles,
    };
  };

  const lineToolTipStyle = () => {
    const styles = {} as React.CSSProperties;
    if (direction === ItemDirection.HORIZONTAL) {
      styles['left'] = '4px';
      styles['top'] = '22px';
    } else {
      styles['left'] = '22px';
      styles['top'] = '4px';
    }
    return {
      ...styles,
    };
  };

  const handleDelete = () => {
    onDelete && onDelete();
  };

  const handleMouseDown = () => {
    onMouseDown && onMouseDown();
  };

  const handleMouseUp = () => {
    onMouseUp && onMouseUp();
  };

  return (
    <LineBox style={{ ...lineStyles() }} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      <FlexBox style={{ ...lineToolTipStyle() }}>
        <LineToolTip>{value}</LineToolTip>
        <DeleteBtn className="delete" onClick={handleDelete}>
          删除
        </DeleteBtn>
      </FlexBox>
    </LineBox>
  );
};

export default React.memo(Line);
