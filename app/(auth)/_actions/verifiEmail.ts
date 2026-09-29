import { useRouter } from "next/router";

export const verifyEmail = async (email:string,otp:string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_APP_URL}/user/email-verification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        otp,
      }),
    });

    const data = await response.json();

    console.log(data);
    return data
  } catch (error) {
    console.error(error);
  }
};