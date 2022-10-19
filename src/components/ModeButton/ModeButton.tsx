import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import { Tooltip } from '@mui/material';
import useTheme from '@/store/theme';
import useLocale from '@/hooks/useLocale';

function ModeButton() {
  const [themeMode, { toggle }] = useTheme();
  const t = useLocale();

  return (
    <Tooltip title={themeMode === 'light' ? t['theme.toDark'] : t['theme.toLight']}>
      {themeMode === 'light' ? (
        <Brightness2Icon onClick={toggle} />
      ) : (
        <BrightnessHighIcon onClick={toggle} />
      )}
    </Tooltip>
  );
}

export default ModeButton;
