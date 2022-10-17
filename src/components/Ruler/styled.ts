import { styled } from '@mui/system';

const PositionWrap = styled('div')({
  position: 'absolute',
});

const RulerLayerWrap = styled(PositionWrap)({
  width: '100%',
  height: '100%',
});

const HRulerWrap = styled(PositionWrap)({
  left: '20px',
});

const VRulerWrap = styled(PositionWrap)({
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

const RulerWrap = styled(PositionWrap)({
  zIndex: 10,
});

const ChildrenWrap = styled(PositionWrap)({
  top: '21px',
  left: '21px',
});

export { RulerWrap, RulerLayerWrap, Indicator, HRulerWrap, VRulerWrap, ShowBtn, ChildrenWrap };
