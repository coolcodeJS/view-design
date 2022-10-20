import React, { useState } from 'react';
import IconButton from '../IconButton';
import useLocale from '@/store/locale';
import LanguageIcon from '@mui/icons-material/Language';
import { Menu, MenuItem } from '@mui/material';

function LocaleButton() {
  const [, setLocale] = useLocale();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (value: string) => {
    setLocale(value);
    handleClose();
  };

  return (
    <>
      <IconButton icon={<LanguageIcon />} onClick={handleClick} />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => handleSelect('zh-CN')}>中文</MenuItem>
        <MenuItem onClick={() => handleSelect('en-US')}>English</MenuItem>
      </Menu>
    </>
  );
}

export default React.memo(LocaleButton);
