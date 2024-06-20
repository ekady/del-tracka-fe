import { IFileStream } from '@/app/_common/types';

export interface IProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface IProfilePassword {
  password?: string;
  passwordConfirm?: string;
}

export interface IProfileRequest extends IProfile, IProfilePassword {
  picture?: string | File | IFileStream | null;
  imageUrl?: string | null;
}

export interface IProfileResponse extends IProfile, IProfilePassword {
  picture?: string | File | IFileStream | null;
  imageUrl?: string | null;
}
