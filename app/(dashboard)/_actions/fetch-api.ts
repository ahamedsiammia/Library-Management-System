"use server"
import { cookies } from "next/headers";
import { File } from "node:buffer";

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

export const  getMyPayments =async()=> {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(
    `${batchUrl}/payment/my-payments`,
    {
        headers : {authorization:token as string},
      cache: "no-store",
    }
  );

  const result =await res.json();
  return result
}

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

export const uploadProfile = async (formData: FormData) => {
  const token = (await cookies()).get("accessToken")?.value;

  const res = await fetch(`${batchUrl}/user/profile-image`, {
    method: "PATCH",
    headers: { Authorization: `${token}` },
    body: formData,
  });
  console.log(res,"this is image upload response");
  return res.json();
};