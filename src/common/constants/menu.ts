import { IMenuItem } from '@/common/types';

const menu: readonly IMenuItem[] = [
  { name: 'Dashboard', path: '/app/dashboard', icon: 'assessment' },
  { name: 'Projects', path: '/app/projects', icon: 'work' },
  { name: 'My Tasks', path: '/app/my-issues', icon: 'bug_report' },
  { name: 'Log Activities', path: '/app/log-activities', icon: 'receipt' },
];

export default menu;
