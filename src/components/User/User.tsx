import React, { useState } from 'react';
import UserIcon from './assets/imgs/user.webp';
import { Avatar, Menu, MenuItem, Divider } from '@mui/material';
import { Cursor } from './styled';
import useLocale from '@/hooks/useLocale';

function User() {
  const t = useLocale();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Cursor>
        <span onClick={handleClick}>
          <Avatar src={UserIcon} alt="user_icon" sx={{ width: 40, height: 40 }} />
        </span>
      </Cursor>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem>Saber</MenuItem>
        <Divider />
        <MenuItem>{t['user.personalSpace']}</MenuItem>
        <MenuItem>{t['user.projectDocuments']}</MenuItem>
        <MenuItem>{t['user.logOut']}</MenuItem>
      </Menu>
    </>
  );
}

export default React.memo(User);
