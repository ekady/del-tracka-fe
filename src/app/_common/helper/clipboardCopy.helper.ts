import { toast } from 'react-toastify';

import { TFunctionVoid } from '@/app/_common/types';

const copyToClipboard = (async (text: string, callback?: TFunctionVoid): Promise<void> => {
  if (navigator) await navigator.clipboard.writeText(text);

  callback?.();

  toast.info('Copied to the clipboard');
}) as (text: string, callback?: TFunctionVoid) => void;

export default copyToClipboard;
