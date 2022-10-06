export interface LoginRequest {
  email: string;
  password: string;
}

export interface ContinueWithProviderRequest {
  jwtToken: string;
}

export interface SignUpRequest extends LoginRequest {
  passwordConfirm: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  data: Credential;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordForm {
  password: string;
  passwordConfirm: string;
}

export interface ResetPasswordRequest extends ResetPasswordForm {
  resetToken: string;
}
