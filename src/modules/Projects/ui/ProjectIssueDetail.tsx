// React
import { useState } from 'react';

// MUI Components
import { Box, Button, ButtonGroup } from '@mui/material';

// Local Components
import { ProjectIssueActivity, ProjectIssueComments, ProjectIssueForm } from './components';
import { CarouselImages } from '@/common/base';

const images = [
  'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
  'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=800&h=250&q=60',
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&h=250&q=80',
  'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=800&h=250&q=60',
];

// Create : Only Form that contain upload image
// View: Disabled form, contain form without upload image, media, comments, logs
// Edit: Form contain upload image, comments, logs

export default function ProjectIssueDetail() {
  const [tab, setTab] = useState<string>('form');

  const setVariantButton = (type: string) => {
    return tab === type ? 'contained' : 'outlined';
  };

  const onClickButton = (type: string) => {
    if (tab === type) return;
    setTab(type);
  };
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center">
        <ButtonGroup disableElevation variant="outlined" aria-label="outlined primary button group">
          <Button variant={setVariantButton('form')} onClick={() => onClickButton('form')}>
            Form
          </Button>
          <Button variant={setVariantButton('media')} onClick={() => onClickButton('media')}>
            Media
          </Button>
          <Button variant={setVariantButton('comments')} onClick={() => onClickButton('comments')}>
            Comments
          </Button>
          <Button variant={setVariantButton('activities')} onClick={() => onClickButton('activities')}>
            Activities
          </Button>
        </ButtonGroup>
      </Box>

      <Box height={40} />

      {tab === 'form' && <ProjectIssueForm />}
      {tab === 'comments' && <ProjectIssueComments />}
      {tab === 'activities' && <ProjectIssueActivity />}
      {tab === 'media' && (
        <Box position="relative" bgcolor="white">
          <CarouselImages images={images} />
        </Box>
      )}
    </>
  );
}
