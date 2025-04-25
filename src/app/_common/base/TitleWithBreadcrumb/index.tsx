import Link from 'next/link';

import { ArrowBack } from '@mui/icons-material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, IconButton } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import LinkMUI from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { IBreadcrumb } from '@/app/_common/types';

export interface ITitleWithBreadcrumbProps {
  title: string;
  breadcrumbs: IBreadcrumb[];
  backTo?: string;
  onBackTo?: () => void;
}

const TitleWithBreadcrumb = ({ breadcrumbs, title, backTo, onBackTo }: ITitleWithBreadcrumbProps) => {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      flexWrap="wrap"
      alignItems={{ xs: 'flex-start', md: 'center' }}
      gap={2}
      justifyContent={{ xs: 'flex-start', md: 'space-between' }}
      marginBottom={{ xs: 4, md: 5 }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {!!backTo && (
          <IconButton LinkComponent={Link} href={backTo} size="small">
            <ArrowBack />
          </IconButton>
        )}
        {!!onBackTo && !backTo && (
          <IconButton onClick={onBackTo} size="small">
            <ArrowBack />
          </IconButton>
        )}
        <Typography variant="h5">{title}</Typography>
      </Box>

      {breadcrumbs.length > 0 && (
        <Breadcrumbs separator={<NavigateNextIcon />} aria-label="breadcrumb">
          {breadcrumbs.map((breadcrumb, index) => {
            if (index === breadcrumbs.length - 1) {
              return (
                <Typography sx={{ textTransform: 'capitalize' }} key={breadcrumb.href}>
                  {breadcrumb.breadcrumb}
                </Typography>
              );
            }
            return (
              <Link href={breadcrumb.href} passHref key={breadcrumb.href}>
                <Typography sx={{ textTransform: 'capitalize' }}>
                  <LinkMUI component="span" underline="none" sx={{ cursor: 'pointer' }}>
                    {breadcrumb.breadcrumb}
                  </LinkMUI>
                </Typography>
              </Link>
            );
          })}
        </Breadcrumbs>
      )}
    </Box>
  );
};

export default TitleWithBreadcrumb;
