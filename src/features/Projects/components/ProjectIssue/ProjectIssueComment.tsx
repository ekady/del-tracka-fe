import { Avatar, Box, Typography } from '@mui/material';

export type ProjectIssueCommentProps = {
  name: string;
  date: string;
  comment: string;
  image?: string;
};

const ProjectIssueComment = ({ name, date, comment, image }: ProjectIssueCommentProps) => {
  return (
    <Box display="flex" alignItems="star">
      <Box marginRight={2}>{!image && <Avatar />}</Box>
      <Box>
        <Box display="flex" alignItems="center" marginBottom={1}>
          <Typography variant="body1" fontWeight="bold" marginRight={2}>
            {name}
          </Typography>
          <Typography variant="subtitle2">{date}</Typography>
        </Box>
        <Box>{comment}</Box>
      </Box>
    </Box>
  );
};

export default ProjectIssueComment;
