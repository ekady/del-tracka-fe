import { useCallback, useEffect } from 'react';

import { onMessage } from 'firebase/messaging';
import { toast } from 'react-toastify';

import { actionRegisterDevice } from '@/app/_common/actions/device.action';
import {
  revalidateNotificationListTag,
  revalidateUnreadNotificationListTag,
} from '@/app/_common/actions/notification.action';
import { firebaseCloudMessaging } from '@/app/_common/utils/firebase';

export const useNotification = () => {
  const setToken = useCallback(async () => {
    try {
      const { token, messaging } = await firebaseCloudMessaging.init();
      if (token) {
        await actionRegisterDevice(token);
      }

      if (messaging) {
        onMessage(messaging, (payload) => {
          toast.info(payload.notification?.body, { position: 'top-right' });
          revalidateNotificationListTag();
          revalidateUnreadNotificationListTag();
        });
      }
    } catch {
      //
    }
  }, []);

  useEffect(() => {
    setToken().catch(() => {
      //
    });
  }, [setToken]);
};
