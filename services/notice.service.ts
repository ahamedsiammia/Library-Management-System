import {
  Notice,
  CreateNoticePayload,
  UpdateNoticePayload,
} from "@/types/notice.types";
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

export const noticeService = {
  async getAllNotices(): Promise<Notice[]> {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/notice/all-notice`, {
      headers,
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch notices");
    return (data.data || []).map((n: any) => ({
      ...n,
      content: n.description || n.content || "",
      description: n.description || n.content || "",
      visibility: n.visibility || "PUBLIC",
    }));
  },

  async createNotice(
    payload: CreateNoticePayload & { content?: string }
  ): Promise<Notice> {
    const headers = await getAuthHeaders();
    const body = {
      title: payload.title,
      description: payload.description || payload.content || "",
      visibility: payload.visibility || "PUBLIC",
    };
    const res = await fetch(`${API_BASE_URL}/notice/create-notice`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create notice");
    return data.data;
  },

  async updateNotice(
    noticeId: string,
    payload: UpdateNoticePayload & { content?: string }
  ): Promise<Notice> {
    const headers = await getAuthHeaders();
    const body: Record<string, any> = {};
    if (payload.title !== undefined) body.title = payload.title;
    if (payload.description !== undefined || payload.content !== undefined) {
      body.description = payload.description || payload.content;
    }
    if (payload.visibility !== undefined) body.visibility = payload.visibility;

    const res = await fetch(`${API_BASE_URL}/notice/update-notice/${noticeId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update notice");
    return data.data;
  },

  async deleteNotice(noticeId: string): Promise<{ message: string }> {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/notice/delete-notice/${noticeId}`, {
      method: "DELETE",
      headers,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete notice");
    return data.data;
  },
};
