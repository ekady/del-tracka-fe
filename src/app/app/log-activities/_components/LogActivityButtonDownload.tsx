'use client';

import { useCallback, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import dayjs from 'dayjs';

import clientFetcher from '@/app/_common/helper/clientFetcher.helper';
import { forceFileDownload } from '@/app/_common/helper/file.helper';
import { TFunctionVoid } from '@/app/_common/types';

const initialDateValue = {
  startDate: dayjs().startOf('month').toISOString(),
  endDate: dayjs().endOf('month').toISOString(),
};

const LogActivityButtonDownload = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const handleGetFile = useCallback(
    async (type: 'pdf' | 'xlsx' = 'pdf') => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          startDate: (searchParams.get('startDate') as string) || initialDateValue.startDate,
          endDate: (searchParams.get('endDate') as string) || initialDateValue.endDate,
        });
        const response = await clientFetcher(
          `/project/${searchParams.get('project')}/activity/${type}?${params.toString()}`,
          { method: 'post' },
        );

        const blob = await response.blob();

        if (blob) forceFileDownload(blob, { fileFormat: type, filename: 'Project Activities' });
      } finally {
        setLoading(false);
      }
    },
    [searchParams],
  );

  return (
    <Box my={3} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
      <LoadingButton
        variant="contained"
        color="secondary"
        onClick={(() => handleGetFile('xlsx')) as TFunctionVoid}
        disabled={!searchParams.get('project')}
        loading={loading}
      >
        Export to Excel
      </LoadingButton>
      <LoadingButton
        variant="contained"
        sx={{ background: '#27A03B', color: '#fff', ml: { xs: 0, sm: 1 }, mt: { xs: 1, sm: 0 } }}
        disabled={!searchParams.get('project')}
        loading={loading}
        onClick={(() => handleGetFile('pdf')) as TFunctionVoid}
      >
        Export to PDF
      </LoadingButton>
    </Box>
  );
};

export default LogActivityButtonDownload;
