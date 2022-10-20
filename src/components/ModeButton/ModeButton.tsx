import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import { Tooltip } from '@mui/material';
import useTheme from '@/store/theme';
import useLocale from '@/hooks/useLocale';
import IconButton from '../IconButton';
import React from 'react';

function ModeButton() {
  const [themeMode, { toggle }] = useTheme();
  const t = useLocale();

  return (
    <Tooltip title={themeMode === 'dark' ? t['theme.toDark'] : t['theme.toLight']}>
      {/* 这个辣鸡，不知道为什么一定要用一个标签在包裹一下，不然会报错 */}
      <span>
        <IconButton
          icon={themeMode !== 'dark' ? <Brightness2Icon /> : <BrightnessHighIcon />}
          onClick={toggle}
        />
      </span>
    </Tooltip>
  );
}

export default React.memo(ModeButton);
