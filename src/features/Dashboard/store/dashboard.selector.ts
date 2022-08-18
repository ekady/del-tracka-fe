import { RootState } from '@/common/store/store';
import { dashboardApiSlice, DashboardResponse } from './dashboard.api.slice';

const initialData: DashboardResponse = {
  totalProjects: 0,
  totalIssues: 0,
  allIssues: [0.01, 0.01, 0.01],
  allAssignTo: [0.01, 0.01, 0.01],
  activities: [],
  activitiesLabel: [],
};

const selectDashboardData = (state: RootState) => dashboardApiSlice.endpoints.getDashboardDatas.select()(state).data;

export const selectTotalProjects = (state: RootState) =>
  selectDashboardData(state)?.totalProjects ?? initialData.totalProjects;
export const selectTotalIssues = (state: RootState) =>
  selectDashboardData(state)?.totalIssues ?? initialData.totalIssues;
export const selectissueAll = (state: RootState) => selectDashboardData(state)?.allIssues ?? initialData.allIssues;
export const selectIssueAssignTo = (state: RootState) =>
  selectDashboardData(state)?.allAssignTo ?? initialData.allAssignTo;
export const selectActivities = (state: RootState) => selectDashboardData(state)?.activities ?? initialData.activities;
export const selectActivitiesLabel = (state: RootState) =>
  selectDashboardData(state)?.activitiesLabel ?? initialData.activitiesLabel;
