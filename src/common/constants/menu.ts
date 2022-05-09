import { MenuItem } from '@/types';

const menu: readonly MenuItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: 'assessment' },
  { name: 'Projects', path: '/projects', icon: 'work' },
  { name: 'My Issues', path: '/my-issues', icon: 'bug_report' },
  { name: 'Log Activities', path: '/log-activities', icon: 'receipt' },
];

export default menu;
