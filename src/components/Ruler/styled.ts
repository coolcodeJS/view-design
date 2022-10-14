import { styled } from '@mui/system';

const PositionWrap = styled('div')({
  position: 'absolute',
});

const RulerWrap = styled(PositionWrap)({
  width: '100%',
  height: '100%',
});

const HRulerWrap = styled(PositionWrap)({
  height: '21px',
});
const VRulerWrap = styled(PositionWrap)({
  width: '21px',
});

const Indicator = styled(PositionWrap)({
  top: 0,
  border: '1px solid red',
  pointerEvents: 'none',
});

export { RulerWrap, Indicator, HRulerWrap, VRulerWrap };
