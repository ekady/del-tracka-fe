// Local Components
import { TableMenuSelection } from '@/common/components/base';

// Constants
import status from '@/common/constants/status';

export interface ProjectIssueChangeStatusProps {
  currentStatus: string;
  handleChange?: (status: string) => void;
}

export default function ProjectIssueChangeStatus({ currentStatus, handleChange }: ProjectIssueChangeStatusProps) {
  return (
    <TableMenuSelection
      list={Object.keys(status).map((key) => status[key])}
      itemText="name"
      currentValue={currentStatus}
      handleChange={handleChange}
      IconProps={{ sx: { color: status[currentStatus].textColor, padding: 0, mr: 1 } }}
    />
  );
}
