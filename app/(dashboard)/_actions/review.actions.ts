"use server";

import {
  Review,
  CreateReviewPayload,
  UpdateReviewPayload,
} from "@/types/review.types";
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

export async function getReviewsByBookIdAction(
  bookId: string
): Promise<{ success: boolean; data?: Review[]; message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/review/book-review/${bookId}`, {
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.message || "Failed to fetch reviews" };
    }
    return { success: true, data: data.data || [] };
  } catch (error: any) {
    return { success: false, message: error.message || "Server error" };
  }
}

export const getBookReviewsAction = getReviewsByBookIdAction;

export async function createReviewAction(
  payload: CreateReviewPayload
): Promise<{ success: boolean; data?: Review; message?: string }> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/review/create-review`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.message || "Failed to submit review" };
    }
    return { success: true, data: data.data };
  } catch (error: any) {
    return { success: false, message: error.message || "Server error" };
  }
}

export async function updateReviewAction(
  reviewId: string,
  payload: UpdateReviewPayload
): Promise<{ success: boolean; data?: Review; message?: string }> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/review/update-review/${reviewId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.message || "Failed to update review" };
    }
    return { success: true, data: data.data };
  } catch (error: any) {
    return { success: false, message: error.message || "Server error" };
  }
}

export async function deleteReviewAction(
  reviewId: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/review/delete-review/${reviewId}`, {
      method: "DELETE",
      headers,
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.message || "Failed to delete review" };
    }
    return { success: true, message: data.message || "Review deleted successfully" };
  } catch (error: any) {
    return { success: false, message: error.message || "Server error" };
  }
}
