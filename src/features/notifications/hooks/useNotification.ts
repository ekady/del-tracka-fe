import { useEffect } from 'react';
import { onMessage } from 'firebase/messaging';
import { firebaseCloudMessaging } from '../utils/firebase';
import { toast } from 'react-toastify';
import { authApiSlice } from '@/features/auth/store/auth.api.slice';
import store from '@/common/store';
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

async function setToken() {
  try {
    const { token, messaging } = await firebaseCloudMessaging.init();
    if (token) {
      await store.dispatch(authApiSlice.endpoints.registerDeviceId.initiate({ deviceId: token }));
    }

    if (messaging) {
      onMessage(messaging, (payload) => {
        toast.info(payload.notification?.body, { position: 'top-right' });
        store.dispatch(notificationInvalidateTags(['AllNotifications', 'UnreadNotifications']));
        payload.data?.type && store.dispatch(invalidateTags(TAG_TYPE[payload.data?.type]));
      });
    }
  } catch {
    //
  }
}

export const useNotification = () => {
  useEffect(() => {
    setToken().catch(() => {
      //
    });
  }, []);
};
