import Image from 'next/image';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ImageLoader from '@/app/_common/base/ImageLoader';
import { IFileStream } from '@/app/_common/types';

export interface ITaskCommentItemProps {
  name: string;
  date: string;
  comment: string;
  image?: IFileStream | string | null;
}

const TaskCommentItem = ({ name, date, comment, image }: ITaskCommentItemProps) => {
  const profilePicture =
    typeof image === 'string' ? (
      <Image src={image} alt="profile" height={24} width={24} style={{ borderRadius: '50%' }} />
    ) : (
      image && (
        <ImageLoader
          image={image}
          brokenSize={40}
          imageProps={{
            alt: 'profile',
            height: 40,
            width: 40,
            style: { borderRadius: '50%' },
          }}
        />
      )
    );
  return (
    <Box display="flex" alignItems="star">
      <Box marginRight={2}>{!image ? <Avatar /> : profilePicture}</Box>
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

export default TaskCommentItem;
