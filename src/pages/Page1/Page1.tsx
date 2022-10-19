import Typography from '@mui/material/Typography';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import ModeButton from '@/components/ModeButton';

const Page1 = () => {
  return (
    <>
      <Meta title="page 1" />
      <FullSizeCenteredFlexBox>
        <Typography variant="h3">Page 1</Typography>
        <ModeButton />
      </FullSizeCenteredFlexBox>
    </>
  );
};

export default Page1;
