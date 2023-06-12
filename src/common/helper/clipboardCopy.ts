import { toast } from 'react-toastify';
import { FunctionVoid } from '../types';

const copyToClipboard = (async (text: string, callback?: FunctionVoid): Promise<void> => {
  if (navigator) await navigator.clipboard.writeText(text);

  callback?.();

  toast.info('Copied to the clipboard');
}) as (text: string, callback?: FunctionVoid) => void;

export default copyToClipboard;
