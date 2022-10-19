import { styled } from '@mui/system';
import React from 'react';

/**
 * 垂直水平居中的盒子
 * @returns
 */
const FlexCenterBox = (styles?: React.CSSProperties) => {
  return styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...styles,
  });
};

/**
 * 超出省略号的盒子
 * @returns
 */
const EllipsisBox = () => {
  return styled('div')({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  });
};
export { FlexCenterBox, EllipsisBox };
