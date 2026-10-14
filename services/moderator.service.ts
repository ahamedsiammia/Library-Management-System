import {
  DashboardStats,
  ManagedUser,
  SystemSettings,
  ActivityLog,
  CreateLibrarianPayload,
} from "@/types/moderator.types";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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
    const res = await fetch(`${API_BASE_URL}/librarian/dashboard-stats`, {
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
    const url = `${API_BASE_URL}/user/all-user${params.toString() ? `?${params}` : ""}`;
    const res = await fetch(url, { headers, cache: "no-store" });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch users");
    const rawList = Array.isArray(data.data) ? data.data : data.data?.user || [];
    let list: ManagedUser[] = rawList;
    if (role) {
      const r = role.toUpperCase();
      // Handle both "LIBRARIAN" and "LIBRARYAN"
      list = list.filter((u: ManagedUser) => {
        const userRole = u.role?.toUpperCase();
        if (r === "LIBRARIAN" || r === "LIBRARYAN") {
          return userRole === "LIBRARIAN" || userRole === "LIBRARYAN";
        }
        return userRole === r;
      });
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (u: ManagedUser) =>
          u.name?.toLowerCase().includes(q) ||
          u.email?.toLowerCase().includes(q) ||
          u.instituteName?.toLowerCase().includes(q)
      );
    }
    return list;
  },

  async getAllLibrarians(): Promise<ManagedUser[]> {
    const headers = await getAuthHeaders();
    try {
      const res = await fetch(`${API_BASE_URL}/admin/all-librarian`, {
        headers,
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data.data) ? data.data : data.data?.librarian || [];
        if (list.length > 0) return list;
      }
    } catch {
      // Fallback below
    }
    return this.getAllUsers("LIBRARIAN");
  },

  async updateUserStatus(
    userId: string,
    status: "ACTIVE" | "BLOCKED"
  ): Promise<ManagedUser> {
    const headers = await getAuthHeaders();
    const res = await fetch(
      `${API_BASE_URL}/admin/update-status/${userId}`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify({ activeStatus: status }),
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
    const res = await fetch(`${API_BASE_URL}/librarian/librarians`, {
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
    const res = await fetch(`${API_BASE_URL}/librarian/settings`, {
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
    const res = await fetch(`${API_BASE_URL}/librarian/settings`, {
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
    const res = await fetch(`${API_BASE_URL}/librarian/logs`, {
      headers,
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch logs");
    return data.data;
  },
};
