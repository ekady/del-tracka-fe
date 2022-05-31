// Local Component
import { Logs } from '@/features/Logs/components';
import { LogsResponse } from '@/features/Logs/store/logs.api';

const dummyLogs: LogsResponse[] = [
  {
    id: '1',
    projectName: 'Health',
    date: '2021-02-09',
    cardNumber: 'Card#12',
    feature: 'Course',
    activity: 'Mess move A to Review Waiting',
  },
  {
    id: '2',
    projectName: 'Health',
    date: '2021-02-09',
    cardNumber: 'Card#12',
    feature: 'Course',
    activity: 'Mess move A to Review Waiting',
  },
  {
    id: '3',
    projectName: 'Health',
    date: '2021-02-09',
    cardNumber: 'Card#12',
    feature: 'Course',
    activity: 'Mess move A to Review Waiting',
  },
  {
    id: '4',
    projectName: 'Health',
    date: '2021-02-09',
    cardNumber: 'Card#12',
    feature: 'Course',
    activity: 'Mess move A to Review Waiting',
  },
];

const ProjectIssueActivity = () => {
  return <Logs logs={dummyLogs} notFullInfo isUsingDate />;
};

export default ProjectIssueActivity;
