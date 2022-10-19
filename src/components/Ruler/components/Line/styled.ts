import { FlexCenterBox } from '@/styles/common.styled';
import { styled } from '@mui/system';

const LineBox = styled('div')({
  position: 'absolute',
  backgroundColor: 'red',
  zIndex: 7,
  cursor: 'move',
  '&:hover': {
    '.delete': {
      display: 'block',
    },
  },
});

const FlexBox = FlexCenterBox({
  position: 'absolute',
  width: '70px',
  justifyContent: 'space-between',
});

const LineToolTip = styled('div')({
  backgroundColor: 'green',
  zIndex: 7,
  pointerEvents: 'none',
});

const DeleteBtn = styled('div')({
  display: 'none',
  backgroundColor: 'blue',
  color: 'red',
  cursor: 'pointer',
  zIndex: 7,
});

export { LineBox, LineToolTip, DeleteBtn, FlexBox };