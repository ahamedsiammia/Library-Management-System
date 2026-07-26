import { api } from "./api";
import { LoginPayload, RegisterPayload, AuthResponse } from "@/types/auth.types";

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/user/login", payload);
    return response.data;
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/user/register", payload);
    return response.data;
  },

  async getMe(): Promise<AuthResponse> {
    const response = await api.get<AuthResponse>("/user/me");
    return response.data;
  },

  // Client-side logout: clear cookies by calling the backend if available,
  // otherwise just redirect — cookie is httpOnly so we can't clear it via JS directly.
  async logout(): Promise<void> {
    try {
      await api.post("/user/logout");
    } catch {
      // Backend may not have logout endpoint — that's ok
    }
  },
};
