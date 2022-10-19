import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import { Tooltip } from '@mui/material';
import useTheme from '@/store/theme';
import useLocale from '@/hooks/useLocale';
import IconButton from '@/components/IconButton';
import React from 'react';

function ModeButton() {
  const [themeMode, { toggle }] = useTheme();
  const t = useLocale();

  return (
    <Tooltip title={themeMode === 'dark' ? t['theme.toDark'] : t['theme.toLight']}>
      <div>
        <IconButton
          icon={themeMode !== 'dark' ? <Brightness2Icon /> : <BrightnessHighIcon />}
          onClick={toggle}
        />
      </div>
    </Tooltip>
  );
}

export default React.memo(ModeButton);
