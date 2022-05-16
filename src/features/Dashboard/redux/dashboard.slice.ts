import { createSlice } from '@reduxjs/toolkit';

export interface DashboardState {
  status: 'idle' | 'loading' | 'error' | 'finished';
  totalProjects: number;
  totalIssues: number;
  allIssues: [number, number, number];
  allAssignTo: [number, number, number];
  activities: number[];
  activitiesLabel: string[];
}

const initialState: DashboardState = {
  status: 'idle',
  totalProjects: 0,
  totalIssues: 0,
  allIssues: [0, 0, 0],
  allAssignTo: [0, 0, 0],
  activities: [],
  activitiesLabel: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: { data: initialState },
  reducers: {
    getData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { getData } = dashboardSlice.actions;

export default dashboardSlice.reducer;
