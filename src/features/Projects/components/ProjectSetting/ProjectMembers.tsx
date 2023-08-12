// MUI Components
import Box from '@mui/material/Box';

// Local Components
import ProjectFormNewMember from './ProjectFormNewMember';
import ProjectMemberList from './ProjectMemberList';

const ProjectMembers = () => {
  return (
    <>
      <ProjectFormNewMember />
      <Box height={40} />
      <ProjectMemberList />
    </>
  );
};

export default ProjectMembers;
