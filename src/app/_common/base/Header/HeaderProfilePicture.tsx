'use client';

import Image from 'next/image';

import AccountCircle from '@mui/icons-material/AccountCircle';

import ImageLoader from '@/app/_common/base/ImageLoader';
import { IFileStream } from '@/app/_common/types';

const HeaderProfilePicture = ({ image }: { image?: string | IFileStream | null }) => {
  if (!image) return <AccountCircle />;

  return typeof image === 'string' ? (
    <Image src={image} alt="profile" height={24} width={24} style={{ borderRadius: '50%' }} />
  ) : (
    image && (
      <ImageLoader
        image={image}
        imageProps={{
          alt: 'profile',
          height: 24,
          width: 24,
          style: { borderRadius: '50%' },
        }}
      />
    )
  );
};

export default HeaderProfilePicture;
