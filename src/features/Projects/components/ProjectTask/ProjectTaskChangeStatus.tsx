// Local Components
import { TableMenuSelection } from '@/common/base';

// Constants
import STATUS, { StatusType } from '@/common/constants/status';

// Types
import { FunctionVoidWithParams } from '@/common/types';

export type ProjectTaskChangeStatusProps = {
  currentStatus: string;
  handleChange?: FunctionVoidWithParams<string>;
};

const ProjectTaskChangeStatus = ({ currentStatus, handleChange }: ProjectTaskChangeStatusProps) => {
  return (
    <TableMenuSelection
      list={Object.keys(STATUS).map(
        (key) =>
          ({ name: STATUS[key as StatusType].name, value: STATUS[key as StatusType].value } as Record<string, string>),
      )}
      itemText="name"
      currentValue={currentStatus}
      handleChange={handleChange}
      IconProps={{ sx: { color: STATUS[currentStatus as StatusType].textColor, padding: 0, mr: 1 } }}
    />
  );
};

export default ProjectTaskChangeStatus;
