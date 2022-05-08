// Next Components
import Image from 'next/image';

// Components
import { Box, ImageList, ImageListItem } from '@mui/material';

// Utils
import { useMediaQuery, useTheme } from '@mui/material';

const LandingImages = () => {
  const theme = useTheme();
  const smAndUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box sx={{ width: '100%', height: '100%', overflowY: 'visible' }}>
      <ImageList cols={smAndUp ? 2 : 1} variant={smAndUp ? 'woven' : 'standard'} sx={{ overflowY: 'visible' }}>
        {itemData.map((item) => (
          <ImageListItem key={item.id}>
            <Image
              src={`${item.img}?w=248&fit=crop&auto=format`}
              alt={item.title}
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default LandingImages;

const itemData = [
  {
    id: '1',
    img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
    title: 'Kitchen',
  },
  {
    id: '2',
    img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
    title: 'Kitchen',
  },
  {
    id: '3',
    img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
    title: 'Kitchen',
  },
  {
    id: '4',
    img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
    title: 'Kitchen',
  },
];
