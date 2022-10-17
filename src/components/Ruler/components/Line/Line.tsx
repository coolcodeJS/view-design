import React from 'react';
import { Direction, LineDelete } from '../../type';
import { ItemDirection } from '../RulerItem/RulerItem';
import { DeleteBtn, FlexBox, LineBox, LineToolTip } from './styled';

interface IProps extends Direction {
  value: number;
  onDelete?: (data: LineDelete) => void;
}

const Line: React.FC<IProps> = (props) => {
  const { value, direction } = props;
  const lineStyles = () => {
    const styles = {} as React.CSSProperties;
    if (direction === ItemDirection.HORIZONTAL) {
      styles['left'] = value;
      styles['top'] = 0;
      styles['height'] = '100vh';
    } else {
      styles['left'] = 0;
      styles['top'] = value;
      styles['width'] = '100vw';
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
    console.log('delete');
  };
  return (
    <LineBox style={{ ...lineStyles() }}>
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
