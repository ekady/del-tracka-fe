import { useCallback, useEffect } from 'react';
import { onMessage } from 'firebase/messaging';
import { firebaseCloudMessaging } from '../utils/firebase';
import { toast } from 'react-toastify';
import { useRegisterDeviceIdMutation } from '@/features/auth/store/auth.api.slice';
import { useAppDispatch } from '@/common/store';
import { TProjectTags, invalidateTags } from '@/features/projects/store/project.api.slice';
import { notificationInvalidateTags } from '../store/notification.api.slice';

const TAG_TYPE: { [key: string]: TProjectTags[] } = {
  CREATE_TASK: ['Task', 'Tasks'],
  UPDATE_TASK: ['Task', 'Tasks'],
  UPDATE_TASK_STATUS: ['Task', 'Tasks'],
  DELETE_TASK: ['Tasks', 'Task'],
  CREATE_COMMENT: ['Task', 'Comments'],
  ADDED_PROJECT: ['Project'],
  UPDATED_ROLE: ['Project'],
};

export const useNotification = () => {
  const dispatch = useAppDispatch();
  const [registerDeviceId] = useRegisterDeviceIdMutation();
  const setToken = useCallback(async () => {
    try {
      const { token, messaging } = await firebaseCloudMessaging.init();
      if (token) {
        await registerDeviceId({ deviceId: token });
      }

      if (messaging) {
        onMessage(messaging, (payload) => {
          toast.info(payload.notification?.body, { position: 'top-right' });
          dispatch(notificationInvalidateTags(['AllNotifications', 'UnreadNotifications']));
          payload.data?.type && dispatch(invalidateTags(TAG_TYPE[payload.data?.type]));
        });
      }
    } catch {
      //
    }
  }, [registerDeviceId, dispatch]);

  useEffect(() => {
    setToken().catch(() => {
      //
    });
  }, [setToken]);
};
