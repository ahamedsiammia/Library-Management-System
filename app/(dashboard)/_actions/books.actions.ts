"use server";

import { cookies } from "next/headers";
import { Book } from "@/types/book.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function getAuthHeaders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// ─── Create Book ──────────────────────────────────────────────────────────────
export async function createBookAction(payload: Partial<Book>): Promise<{
  success: boolean;
  data?: Book;
  message?: string;
}> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/books/create-books`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message || "Failed to create book" };
    return { success: true, data: data.data };
  } catch (error: any) {
    return { success: false, message: error.message || "Server error" };
  }
}

// ─── Update Book ──────────────────────────────────────────────────────────────
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
    if (!res.ok) return { success: false, message: data.message || "Failed to update book" };
    return { success: true, data: data.data };
  } catch (error: any) {
    return { success: false, message: error.message || "Server error" };
  }
}

// ─── Get All Books (admin/librarian view with pagination) ─────────────────────
export async function getAllBooksAdminAction(
  page = 1,
  search = "",
  category = ""
): Promise<{
  success: boolean;
  data?: Book[];
  meta?: { page: number; limit: number; total: number; totalPage: number };
  message?: string;
}> {
  try {
    const params = new URLSearchParams();
    params.append("page", String(page));
    if (search) params.append("search", search);
    if (category) params.append("category", category);
    const res = await fetch(`${API_BASE_URL}/books?${params.toString()}`, {
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message || "Failed to fetch books" };
    return { success: true, data: data.data, meta: data.meta };
  } catch (error: any) {
    return { success: false, message: error.message || "Server error" };
  }
}
