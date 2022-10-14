import { styled } from '@mui/system';

const PositionWrap = styled('div')({
  position: 'absolute',
});

const RulerWrap = styled(PositionWrap)({
  width: '100%',
  height: '100%',
});

const LineWrap = styled(PositionWrap)({});

const HRulerWrap = styled(PositionWrap)({
  height: '21px',
});

const Indicator = styled(PositionWrap)({
  position: 'absolute',
  top: 0,
  height: '100vw',
  border: '1px solid red',
  pointerEvents: 'none',
});

export { RulerWrap, Indicator, HRulerWrap, LineWrap };
