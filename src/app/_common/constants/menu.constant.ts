import { IMenuItem } from '@/app/_common/types';

const menu: readonly IMenuItem[] = [
  { name: 'Dashboard', path: '/app/dashboard', icon: 'assessment' },
  { name: 'Projects', path: '/app/projects', icon: 'work' },
  { name: 'My Tasks', path: '/app/my-tasks', icon: 'bug_report' },
  { name: 'Log Activities', path: '/app/log-activities', icon: 'receipt' },
];

export default menu;

export const MAPPING_MENU: Record<string, string> = {
  PROJECT: 'Project',
  MEMBER: 'Member',
  STAGE: 'Sprint',
  TASK: 'Task',
  COMMENT: 'Comment',
};
