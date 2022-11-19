import { IUserInfo } from '@/common/types';
import { apiSlice } from './api.slice';
import { RootState } from '.';

const initialDataProfile: IUserInfo = {
  _id: null,
  email: null,
  firstName: null,
  lastName: null,
  picture: null,
};

export const selectUser = (state: RootState) => apiSlice.endpoints.getProfile.select()(state).data?.data;
export const selectUserId = (state: RootState) => selectUser(state)?._id ?? initialDataProfile._id;
export const selectUserEmail = (state: RootState) => selectUser(state)?.email ?? initialDataProfile.email;
export const selectUserFirstName = (state: RootState) => selectUser(state)?.firstName ?? initialDataProfile.firstName;
export const selectUserLastName = (state: RootState) => selectUser(state)?.lastName ?? initialDataProfile.lastName;
export const selectUserImage = (state: RootState) => selectUser(state)?.picture ?? initialDataProfile.picture;
