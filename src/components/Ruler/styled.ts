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
  right: 0,
  bottom: 0,
  top: 0,
});

const VRulerWrap = styled(PositionWrap)({
  top: '20px',
  right: 0,
  bottom: 0,
  left: 0,
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

const RulerWrap = styled(RulerLayerWrap)({
  zIndex: 10,
});

const ChildrenWrap = styled(PositionWrap)({
  top: '21px',
  left: '21px',
  right: 0,
  bottom: 0,
});

export { RulerWrap, RulerLayerWrap, Indicator, HRulerWrap, VRulerWrap, ShowBtn, ChildrenWrap };
