export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  // add more fields if needed
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: User;
  // token: string;
  refreshToken?: string;
  tokens: Tokens;
}
