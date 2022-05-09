// React Hook Form
import { useForm } from 'react-hook-form';

// MUI Components
import { Box } from '@mui/material';

// Local Components
import ProjectFormNewMember, { ProjectFormNewMemberField } from './ProjectFormNewMember';
import ProjectMemberList from './ProjectMemberList';

const ProjectMembers = () => {
  const form = useForm<ProjectFormNewMemberField>({ mode: 'all' });
  const { handleSubmit } = form;
  const validation = {
    userIds: { required: true },
    roleId: { required: true },
  };
  const addMember = handleSubmit((data) => console.log(data));
  return (
    <>
      <ProjectFormNewMember formOptions={validation} formMethods={form} onSubmit={addMember} />
      <Box height={40} />
      <ProjectMemberList />
    </>
  );
};

export default ProjectMembers;
