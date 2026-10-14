"use server"
import { Book } from "@/types/book.types";
import { cookies } from "next/headers";

const batchUrl = process.env.NEXT_PUBLIC_BACKEND_APP_URL

// my booking request 
export const  getMyBookings =async()=> {
  const token = (await cookies()).get("accessToken")?.value;
  const res = await fetch(
    `${batchUrl}/booking/my-bookings`,
    {
        headers : {authorization:token as string},
      cache: "no-store",
    }
  );

  const result =await res.json();
  return result
}
//  all booking request

export const  getAllBookings =async(page = 1, limit = 8)=> {
  const token = (await cookies()).get("accessToken")?.value;
  const res = await fetch(
    `${batchUrl}/booking/all-bookings?page=${page}&limit=${limit}`,
    {
        headers : {authorization:token as string},
      cache: "no-store",
    }
  );

  const result =await res.json();
  return result
}

// get booking details

export const  getBookingsDetails =async(id : string)=> {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${batchUrl}/booking/booking-details/${id}`,
    {
        headers : {authorization:token as string},
      cache: "no-store",
    }
  );

  const result =await res.json();
  return result
}

// get my payments 
export const  getMyPayments =async()=> {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${batchUrl}/payment/my-payments`,
    {
      method : "GET",
        headers : {authorization:token as string},
      cache: "no-store",
    }
  );

  const result =await res.json();
  return result
}
// get all payments
export const  getAllPayments =async()=> {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${batchUrl}/payment/all-payments`,
    {
      method : "GET",
        headers : {authorization:token as string},
      cache: "no-store",
    }
  );

  const result =await res.json();
  return result
}

// get payments details

export const  getPaymentDetails =async(id : string)=> {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${batchUrl}/payment/payment-details/${id}`,
    {
        headers : {authorization:token as string},
      cache: "no-store",
    }
  );

  const result =await res.json();
  return result
}

// upload profile image

export const uploadProfile = async (formData: FormData) => {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(`${batchUrl}/user/profile-image`, {
    method: "PATCH",
    headers: { Authorization: `${token}` },
    body: formData,
  });
  return res.json();
};

// get single book or book details

export const getBookById = async (id: string): Promise<{ success: boolean; data: Book; message?: string }> => {

    const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(`${batchUrl}/books/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch book: ${res.statusText}`);
  }

  return res.json();
};


// create booking request

export const BorrowRequest = async (id:string) => {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(`${batchUrl}/booking/request/${id}`, {
    method: "POST",
    headers: { Authorization: `${token}` },
  });
  return res.json();
};

// update booking request
export const updateBookingRequest = async (data: any, bookingId: string) => {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(`${batchUrl}/booking/update-request/${bookingId}`, {
    method: "PATCH",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.text();

  console.log("Status:", res.status);
  console.log("Response:", result);

  return JSON.parse(result);
};

// create payments 
export const createPayment = async (data: any) => {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(`${batchUrl}/payment/create-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};