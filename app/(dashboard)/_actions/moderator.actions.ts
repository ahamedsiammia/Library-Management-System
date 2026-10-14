"use server";

import { cookies } from "next/headers";
import {
  DashboardStats,
  ManagedUser,
  SystemSettings,
  ActivityLog,
  CreateLibrarianPayload,
} from "@/types/moderator.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function getAuthHeaders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function getDashboardStatsAction(): Promise<{
  success: boolean;
  data?: DashboardStats;
  message?: string;
}> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/librarian/dashboard-stats`, {
      headers,
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message || "Failed to fetch stats" };
    return { success: true, data: data.data };
  } catch (error: any) {
    return { success: false, message: error.message || "Server error" };
  }
}

export async function getAllUsersAction(
  role?: string,
  search?: string
): Promise<{ success: boolean; data?: ManagedUser[]; message?: string }> {
  try {
    const headers = await getAuthHeaders();
    const params = new URLSearchParams();
    if (role) params.append("role", role);
    if (search) params.append("search", search);
    const url = `${API_BASE_URL}/user/all-user${params.toString() ? `?${params}` : ""}`;
    const res = await fetch(url, { headers, cache: "no-store" });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message || "Failed to fetch users" };
    
    const rawList = Array.isArray(data.data) ? data.data : data.data?.user || [];
    let list: ManagedUser[] = rawList;
    if (role) {
      const r = role.toUpperCase();
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

    return { success: true, data: list };
  } catch (error: any) {
    return { success: false, message: error.message || "Server error" };
  }
}

export async function getAllLibrariansAction(): Promise<{
  success: boolean;
  data?: ManagedUser[];
  message?: string;
}> {
  try {
    const headers = await getAuthHeaders();
    try {
      const res = await fetch(`${API_BASE_URL}/admin/all-librarian`, {
        headers,
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data.data) ? data.data : data.data?.librarian || [];
        if (list.length > 0) return { success: true, data: list };
      }
    } catch {
      // Fallback
    }

    return getAllUsersAction("LIBRARIAN");
  } catch (error: any) {
    return { success: false, message: error.message || "Server error" };
  }
}

export async function updateUserStatusAction(
  userId: string,
  status: "ACTIVE" | "BLOCKED"
): Promise<{ success: boolean; data?: ManagedUser; message?: string }> {
  try {
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
    if (!res.ok) return { success: false, message: data.message || "Failed to update status" };
    return { success: true, data: data.data };
  } catch (error: any) {
    return { success: false, message: error.message || "Server error" };
  }
}

export async function createLibrarianAction(
  payload: CreateLibrarianPayload
): Promise<{ success: boolean; data?: ManagedUser; message?: string }> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/librarian/librarians`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message || "Failed to create librarian" };
    return { success: true, data: data.data };
  } catch (error: any) {
    return { success: false, message: error.message || "Server error" };
  }
}

export async function getSystemSettingsAction(): Promise<{
  success: boolean;
  data?: SystemSettings;
  message?: string;
}> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/librarian/settings`, {
      headers,
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message || "Failed to fetch settings" };
    return { success: true, data: data.data };
  } catch (error: any) {
    return { success: false, message: error.message || "Server error" };
  }
}

export async function updateSystemSettingsAction(
  payload: Partial<SystemSettings>
): Promise<{ success: boolean; data?: SystemSettings; message?: string }> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/librarian/settings`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message || "Failed to update settings" };
    return { success: true, data: data.data };
  } catch (error: any) {
    return { success: false, message: error.message || "Server error" };
  }
}

export async function getActivityLogsAction(): Promise<{
  success: boolean;
  data?: ActivityLog[];
  message?: string;
}> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/librarian/logs`, {
      headers,
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message || "Failed to fetch logs" };
    return { success: true, data: data.data };
  } catch (error: any) {
    return { success: false, message: error.message || "Server error" };
  }
}
