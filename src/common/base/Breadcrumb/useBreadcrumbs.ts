// React
import { useEffect, useState } from 'react';

// Next
import { useRouter } from 'next/router';

// Local
import { BreadcrumbType } from './type';

const convertBreadcrumb = (string: string) => {
  return string.replace(/-/g, ' ').replace(/oe/g, 'ö').replace(/ae/g, 'ä').toLowerCase();
};

const useBreadcrumbs = () => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbType[]>([]);

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/');
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return { breadcrumb: convertBreadcrumb(path), href: '/' + linkPath.slice(0, i + 1).join('/') };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  return { breadcrumbs };
};

export default useBreadcrumbs;
