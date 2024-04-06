import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Box = dynamic(() => import('@mui/material/Box'), { ssr: false });
const Typography = dynamic(() => import('@mui/material/Typography'), { ssr: false });
const Button = dynamic(() => import('@mui/material/Button'), { ssr: false });
const LayoutPlain = dynamic(() => import('@/common/layout/LayoutPlain'), { ssr: false });

const Custom404 = () => {
  const router = useRouter();

  return (
    <LayoutPlain>
      <Box
        minHeight="90vh"
        height="100%"
        display="flex"
        flexDirection="column"
        gap={2}
        alignItems="center"
        justifyContent="center"
      >
        <Typography fontSize={48}>404</Typography>
        <Typography fontSize={20}>No Data Found</Typography>

        <Box my={8} textAlign="center">
          <Button color="primary" variant="contained" size="large" onClick={() => router.back()}>
            Back
          </Button>
        </Box>
      </Box>
    </LayoutPlain>
  );
};

export default Custom404;
