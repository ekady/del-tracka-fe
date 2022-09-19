export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest extends LoginRequest {
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  data: Credential;
}
