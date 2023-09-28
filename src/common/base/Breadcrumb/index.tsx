// Next Components
import Link from 'next/link';

// MUI Components
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import LinkMUI from '@mui/material/Link';

// MUI Utils
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// MUI Icons
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// Custom Hook
import useBreadcrumbs from './useBreadcrumbs';

const Breadcrumb = () => {
  const { breadcrumbs } = useBreadcrumbs();
  const theme = useTheme();
  const mdAndUp = useMediaQuery(theme.breakpoints.up('md'));

  if (!breadcrumbs.length) return null;
  return (
    <>
      <Typography variant="h6" color="text.primary" sx={{ textTransform: 'capitalize', fontSize: 16 }}>
        {breadcrumbs[breadcrumbs.length - 1].breadcrumb}
      </Typography>
      <Breadcrumbs separator={<NavigateNextIcon sx={{ fontSize: 9 }} />} aria-label="breadcrumb">
        {mdAndUp &&
          breadcrumbs.map((breadcrumb, index) => {
            if (index === breadcrumbs.length - 1) {
              return (
                <Typography sx={{ textTransform: 'capitalize', fontSize: 9 }} key={breadcrumb.href}>
                  {breadcrumb.breadcrumb}
                </Typography>
              );
            }
            return (
              <Link href={breadcrumb.href} passHref key={breadcrumb.href}>
                <Typography sx={{ textTransform: 'capitalize', fontSize: 9 }}>
                  <LinkMUI component="span" underline="none" sx={{ cursor: 'pointer' }}>
                    {breadcrumb.breadcrumb}
                  </LinkMUI>
                </Typography>
              </Link>
            );
          })}
      </Breadcrumbs>
    </>
  );
};

export default Breadcrumb;
