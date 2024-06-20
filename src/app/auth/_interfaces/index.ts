import { ICredential } from '@/app/_common/types';

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IContinueWithProviderRequest {
  jwtToken: string;
}

export interface ISignUpRequest extends ILoginRequest {
  passwordConfirm: string;
  firstName: string;
  lastName: string;
}

export interface IAuthResponse {
  data: ICredential;
}

export interface IForgotPasswordRequest {
  email: string;
}

export interface IResetPasswordForm {
  password: string;
  passwordConfirm: string;
}

export interface IResetPasswordRequest extends IResetPasswordForm {
  resetToken: string;
}
