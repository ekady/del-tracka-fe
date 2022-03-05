// React
import { useEffect, useState } from 'react';

// Next Components
import { useRouter } from 'next/router';
import Link from 'next/link';

// MUI Components
import { Breadcrumbs, Typography, Link as LinkMUI } from '@mui/material';

// MUI Utils
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// MUI Icons
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// MUI Colors
import { grey } from '@mui/material/colors';

export interface BreadcrumbType {
  breadcrumb: string;
  href: string;
}

const convertBreadcrumb = (string: string) => {
  return string.replace(/-/g, ' ').replace(/oe/g, 'ö').replace(/ae/g, 'ä').toLowerCase();
};

const Breadcrumb = () => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbType[]>([]);

  const theme = useTheme();
  const mdAndUp = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/');
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return { breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/') };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs.length) {
    return null;
  }

  return (
    <>
      <Typography variant="h6" color="text.primary" sx={{ textTransform: 'capitalize', fontSize: 16 }}>
        {convertBreadcrumb(breadcrumbs[breadcrumbs.length - 1].breadcrumb)}
      </Typography>
      <Breadcrumbs separator={<NavigateNextIcon sx={{ fontSize: 9 }} />} aria-label="breadcrumb">
        {mdAndUp &&
          breadcrumbs.map((breadcrumb, index) => {
            if (index === breadcrumbs.length - 1) {
              return (
                <Typography sx={{ textTransform: 'capitalize', fontSize: 9 }} color={grey[600]} key={breadcrumb.href}>
                  {convertBreadcrumb(breadcrumb.breadcrumb)}
                </Typography>
              );
            }
            return (
              <Link href={breadcrumb.href} passHref key={breadcrumb.href}>
                <Typography sx={{ textTransform: 'capitalize', fontSize: 9 }}>
                  <LinkMUI underline="none" sx={{ cursor: 'pointer' }}>
                    {convertBreadcrumb(breadcrumb.breadcrumb)}
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
