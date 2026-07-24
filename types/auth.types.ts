export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  instituteName: string;
  roll: number;
  semester: string;
  shift: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  accessToken?: string;
  data?: any;
}

export interface ActionResult {
  success: boolean;
  message: string;
  data?: any;
}
