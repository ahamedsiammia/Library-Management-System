"use server"
import { cookies } from "next/headers";

const batchUrl = process.env.NEXT_PUBLIC_BACKEND_APP_URL

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