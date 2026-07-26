"use server";

import { cookies } from "next/headers";
import {
  DashboardStats,
  ManagedUser,
  SystemSettings,
  ActivityLog,
  CreateLibrarianPayload,
} from "@/types/moderator.types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://library-management-system-backend-fawn.vercel.app";

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
    const res = await fetch(`${API_BASE_URL}/moderator/dashboard-stats`, {
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
    const url = `${API_BASE_URL}/moderator/users${params.toString() ? `?${params}` : ""}`;
    const res = await fetch(url, { headers, cache: "no-store" });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message || "Failed to fetch users" };
    return { success: true, data: data.data };
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
      `${API_BASE_URL}/moderator/users/${userId}/status`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify({ status }),
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
    const res = await fetch(`${API_BASE_URL}/moderator/librarians`, {
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
    const res = await fetch(`${API_BASE_URL}/moderator/settings`, {
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
    const res = await fetch(`${API_BASE_URL}/moderator/settings`, {
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
    const res = await fetch(`${API_BASE_URL}/moderator/logs`, {
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
