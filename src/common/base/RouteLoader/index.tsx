import { useCallback, useEffect, useState } from 'react';
import Router from 'next/router';
import { CircularProgress, Dialog, DialogContent } from '@mui/material';

const RouteLoader = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleStartLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const handleStopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    Router.events.on('routeChangeStart', handleStartLoading);
    Router.events.on('routeChangeComplete', handleStopLoading);
    Router.events.on('routeChangeError', handleStopLoading);

    return () => {
      Router.events.off('routeChangeStart', handleStartLoading);
      Router.events.off('routeChangeComplete', handleStopLoading);
      Router.events.off('routeChangeError', handleStopLoading);
    };
  }, [handleStartLoading, handleStopLoading]);

  return (
    <Dialog open={isLoading} maxWidth="xs">
      <DialogContent>
        <CircularProgress />
      </DialogContent>
    </Dialog>
  );
};

export default RouteLoader;
