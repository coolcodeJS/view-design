import { styled } from '@mui/system';

const PositionWrap = styled('div')({
  position: 'absolute',
});

const RulerWrap = styled(PositionWrap)({
  width: '100%',
  height: '100%',
});

const HRulerWrap = styled(RulerWrap)({
  left: '20px',
});
const VRulerWrap = styled(RulerWrap)({
  top: '20px',
});

const ShowBtn = styled(PositionWrap)({
  width: '16px',
  height: '16px',
  top: 0,
  left: 0,
  backgroundColor: 'rgba(200,0,0)',
  cursor: 'pointer',
});

const Indicator = styled(PositionWrap)({
  top: 0,
  border: '1px solid red',
  pointerEvents: 'none',
});

export { RulerWrap, Indicator, HRulerWrap, VRulerWrap, ShowBtn };
