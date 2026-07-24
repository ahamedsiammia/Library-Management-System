import { api } from "./api";
import { UserProfile } from "@/types/user.types";

export const userService = {
  async getProfile(): Promise<UserProfile> {
    const response = await api.get<UserProfile>("/user/me");
    return response.data;
  },
};
