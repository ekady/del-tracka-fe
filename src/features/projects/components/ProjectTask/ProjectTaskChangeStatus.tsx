// Local Components
import { TableMenuSelection } from '@/common/base';

// Constants
import STATUS, { TStatusType } from '@/common/constants/status';

// Types
import { TFunctionVoidWithParams } from '@/common/types';

export interface IProjectTaskChangeStatusProps {
  currentStatus: string;
  handleChange?: TFunctionVoidWithParams<string>;
}

const ProjectTaskChangeStatus = ({ currentStatus, handleChange }: IProjectTaskChangeStatusProps) => {
  return (
    <TableMenuSelection
      list={Object.keys(STATUS).map(
        (key) =>
          ({ name: STATUS[key as TStatusType].name, value: STATUS[key as TStatusType].value }) as Record<
            string,
            string
          >,
      )}
      itemText="name"
      currentValue={currentStatus}
      handleChange={handleChange}
      IconProps={{ sx: { color: STATUS[currentStatus as TStatusType].textColor, padding: 0, mr: 1 } }}
    />
  );
};

export default ProjectTaskChangeStatus;
