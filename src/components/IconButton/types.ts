import React from 'react';
import { IconButtonProps as MIconButtonProps } from '@mui/material';

interface IconButtonProps extends Omit<MIconButtonProps, 'children'> {
  icon: React.ReactNode;
}

export type { IconButtonProps };
