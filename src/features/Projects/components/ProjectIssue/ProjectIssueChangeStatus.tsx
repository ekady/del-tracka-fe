// Local Components
import { TableMenuSelection } from '@/common/base';

// Constants
import STATUS, { StatusType } from '@/common/constants/status';

// Types
import { FunctionVoidWithParams } from '@/common/types';

export type ProjectIssueChangeStatusProps = {
  currentStatus: string;
  handleChange?: FunctionVoidWithParams<string>;
};

const ProjectIssueChangeStatus = ({ currentStatus, handleChange }: ProjectIssueChangeStatusProps) => {
  return (
    <TableMenuSelection
      list={Object.keys(STATUS).map((key) => STATUS[key as StatusType] as Record<string, string>)}
      itemText="name"
      currentValue={currentStatus}
      handleChange={handleChange}
      IconProps={{ sx: { color: STATUS[currentStatus as StatusType].textColor, padding: 0, mr: 1 } }}
    />
  );
};

export default ProjectIssueChangeStatus;
