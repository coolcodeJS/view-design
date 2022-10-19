import { IconButton as MIconButton } from '@mui/material';
import type { IconButtonProps } from './types';
import React from 'react';

function IconButton(props: IconButtonProps) {
  const { icon, onClick } = props;

  return (
    <MIconButton color="primary" onClick={onClick}>
      {icon}
    </MIconButton>
  );
}

export default React.memo(IconButton);
