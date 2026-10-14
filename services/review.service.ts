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

export const reviewService = {
  async getReviewsByBookId(bookId: string): Promise<{ data: Review[]; meta?: any }> {
    const res = await fetch(`${API_BASE_URL}/review/book-review/${bookId}`, {
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch reviews");
    return { data: data.data || [], meta: data.meta };
  },

  async createReview(payload: CreateReviewPayload): Promise<Review> {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/review/create-review`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create review");
    return data.data;
  },

  async updateReview(
    reviewId: string,
    payload: UpdateReviewPayload
  ): Promise<Review> {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/review/update-review/${reviewId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update review");
    return data.data;
  },

  async deleteReview(reviewId: string): Promise<{ message: string }> {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/review/delete-review/${reviewId}`, {
      method: "DELETE",
      headers,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete review");
    return data.data;
  },
};
