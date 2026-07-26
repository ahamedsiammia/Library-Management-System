import {
  DashboardStats,
  ManagedUser,
  SystemSettings,
  ActivityLog,
  CreateLibrarianPayload,
} from "@/types/moderator.types";
import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function getAuthHeaders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export const moderatorService = {
  async getDashboardStats(): Promise<DashboardStats> {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/moderator/dashboard-stats`, {
      headers,
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch stats");
    return data.data;
  },

  async getAllUsers(
    role?: string,
    search?: string
  ): Promise<ManagedUser[]> {
    const headers = await getAuthHeaders();
    const params = new URLSearchParams();
    if (role) params.append("role", role);
    if (search) params.append("search", search);
    const url = `${API_BASE_URL}/moderator/users${params.toString() ? `?${params}` : ""}`;
    const res = await fetch(url, { headers, cache: "no-store" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch users");
    return data.data;
  },

  async updateUserStatus(
    userId: string,
    status: "ACTIVE" | "BLOCKED"
  ): Promise<ManagedUser> {
    const headers = await getAuthHeaders();
    const res = await fetch(
      `${API_BASE_URL}/moderator/users/${userId}/status`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify({ status }),
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update status");
    return data.data;
  },

  async createLibrarian(
    payload: CreateLibrarianPayload
  ): Promise<ManagedUser> {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/moderator/librarians`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create librarian");
    return data.data;
  },

  async getSystemSettings(): Promise<SystemSettings> {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/moderator/settings`, {
      headers,
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch settings");
    return data.data;
  },

  async updateSystemSettings(
    payload: Partial<SystemSettings>
  ): Promise<SystemSettings> {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/moderator/settings`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update settings");
    return data.data;
  },

  async getActivityLogs(): Promise<ActivityLog[]> {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/moderator/logs`, {
      headers,
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch logs");
    return data.data;
  },
};
