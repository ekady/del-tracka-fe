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
