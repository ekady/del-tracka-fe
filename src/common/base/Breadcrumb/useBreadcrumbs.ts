// React
import { useEffect, useState } from 'react';

// Next
import { useRouter } from 'next/router';
import { useAppSelector } from '@/common/store';
import { selectCustomBreadcrumb } from '@/common/store/selector';

export type TBreadcrumb = {
  breadcrumb: string;
  href: string;
};

const convertBreadcrumb = (string: string) => {
  return string.replace(/-/g, ' ').replace(/oe/g, 'ö').replace(/ae/g, 'ä').toLowerCase();
};

const useBreadcrumbs = () => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<TBreadcrumb[]>([]);
  const customBreadcrumb = useAppSelector(selectCustomBreadcrumb);

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/');
      const names = router.pathname.split('/');
      linkPath.shift();
      names.shift();

      const pathArray = linkPath.map((_, i) => {
        const transformBreadcrumb = convertBreadcrumb(names[i]);
        return {
          breadcrumb: customBreadcrumb?.[transformBreadcrumb] || transformBreadcrumb,
          href: '/' + linkPath.slice(0, i + 1).join('/'),
        };
      });

      pathArray.shift();
      setBreadcrumbs(pathArray);
    }
  }, [customBreadcrumb, router]);

  return { breadcrumbs };
};

export default useBreadcrumbs;
