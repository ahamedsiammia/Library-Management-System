"use server";

import { Book } from "@/types/book.types";
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

export async function createBookAction(
  payload: Partial<Book>
): Promise<{ success: boolean; data?: Book; message?: string }> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/books/create-books`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.message || "Failed to create book" };
    }
    return { success: true, data: data.data };
  } catch (error: any) {
    return { success: false, message: error.message || "Server error" };
  }
}

export async function updateBookAction(
  bookId: string,
  payload: Partial<Book>
): Promise<{ success: boolean; data?: Book; message?: string }> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/books/${bookId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.message || "Failed to update book" };
    }
    return { success: true, data: data.data };
  } catch (error: any) {
    return { success: false, message: error.message || "Server error" };
  }
}
