"use server";
import { Book } from "@/types/book.types";
import { cookies } from "next/headers";

const batchUrl = process.env.NEXT_PUBLIC_API_URL;

// Helper: get auth token
async function getToken() {
  return (await cookies()).get("accessToken")?.value;
}

// Helper: get Authorization header (Bearer format)
async function getAuthHeader() {
  const token = await getToken();
  return token ? `Bearer ${token}` : "";
}

// my booking request
export const getMyBookings = async () => {
  const res = await fetch(`${batchUrl}/booking/my-bookings`, {
    headers: { Authorization: await getAuthHeader() },
    cache: "no-store",
  });
  const result = await res.json();
  return result;
};

// all booking request
export const getAllBookings = async (page = 1, limit = 8) => {
  const res = await fetch(
    `${batchUrl}/booking/all-bookings?page=${page}&limit=${limit}`,
    {
      headers: { Authorization: await getAuthHeader() },
      cache: "no-store",
    }
  );
  const result = await res.json();
  return result;
};

// get booking details
export const getBookingsDetails = async (id: string) => {
  const res = await fetch(`${batchUrl}/booking/booking-details/${id}`, {
    headers: { Authorization: await getAuthHeader() },
    cache: "no-store",
  });
  const result = await res.json();
  return result;
};

// get my payments
export const getMyPayments = async () => {
  const res = await fetch(`${batchUrl}/payment/my-payments`, {
    method: "GET",
    headers: { Authorization: await getAuthHeader() },
    cache: "no-store",
  });
  const result = await res.json();
  return result;
};

// get all payments
export const getAllPayments = async () => {
  const res = await fetch(`${batchUrl}/payment/all-payments`, {
    method: "GET",
    headers: { Authorization: await getAuthHeader() },
    cache: "no-store",
  });
  const result = await res.json();
  return result;
};

// get payment details
export const getPaymentDetails = async (id: string) => {
  const res = await fetch(`${batchUrl}/payment/payment-details/${id}`, {
    headers: { Authorization: await getAuthHeader() },
    cache: "no-store",
  });
  const result = await res.json();
  return result;
};

// upload profile image
export const uploadProfile = async (formData: FormData) => {
  const token = await getToken();
  const res = await fetch(`${batchUrl}/user/profile-image`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  return res.json();
};

// get single book or book details
export const getBookById = async (
  id: string
): Promise<{ success: boolean; data: Book; message?: string }> => {
  const res = await fetch(`${batchUrl}/books/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getAuthHeader(),
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch book: ${res.statusText}`);
  }

  return res.json();
};

// create booking request
export const BorrowRequest = async (id: string) => {
  const res = await fetch(`${batchUrl}/booking/request/${id}`, {
    method: "POST",
    headers: { Authorization: await getAuthHeader() },
  });
  return res.json();
};

// update booking request
export const updateBookingRequest = async (data: any, bookingId: string) => {
  const res = await fetch(`${batchUrl}/booking/update-request/${bookingId}`, {
    method: "PATCH",
    headers: {
      Authorization: await getAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.text();
  return JSON.parse(result);
};

// create payment
export const createPayment = async (data: any) => {
  const res = await fetch(`${batchUrl}/payment/create-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getAuthHeader(),
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

// return book
export const returnBook = async (bookingId: string) => {
  const res = await fetch(`${batchUrl}/books/return-book/${bookingId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: await getAuthHeader(),
    },
  });
  return res.json();
};