import { GetServerSidePropsResult } from 'next';

const handleErrorSSr = (err: Error): GetServerSidePropsResult<Record<string, number | string | boolean>> => {
  const error = err as Error;
  if (error?.message !== '404') {
    return { notFound: true };
  }

  return {
    props: { isError: true },
  };
};

export default handleErrorSSr;
