import { IPageParams } from '@/app/_common/types';

import { IIdParams } from '../../../_interfaces';

export interface ILayoutTaskWithIdProps {
  params: Promise<IIdParams>;
  searchParams?: IPageParams['searchParams'];
}
