// Local Component
import LogsUI, { Logs } from '@/modules/Logs/ui/LogsUI';

const dummyLogs: Logs[] = [
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
  return <LogsUI logs={dummyLogs} notFullInfo isUsingDate />;
};

export default ProjectIssueActivity;
