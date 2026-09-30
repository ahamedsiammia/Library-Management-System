"use server";

import { cookies } from "next/headers";
import { ActionResult } from "@/types/auth.types";

export async function loginAction(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      success: false,
      message: "Email and password are required.",
    };
  }

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_APP_URL
  try {
    const res = await fetch(`${backendUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await res.json();

    const data = result.data

    console.log(data,"s;lkedfjh");

    if (!res.ok || data.success === false) {
      return {
        success: false,
        message: data.message || "Invalid credentials or login failed.",
      };
    }

    const accessToken = data.accessToken || data.token || data.data?.accessToken;
    const refreshToken = data.refreshToken || data.token || data.data?.refreshToken;
    
    if (accessToken) {
      const cookieStore = await cookies();
      cookieStore.set("accessToken", accessToken, {
            httpOnly : true,
            maxAge : 60 * 60 * 24 ,
            sameSite : "lax"
      });
    }

    if (refreshToken) {
      const cookieStore = await cookies();
      cookieStore.set("refreshToken", refreshToken, {
            httpOnly : true,
            maxAge : 60 * 60 * 24 *  7,
            sameSite : "lax"
      });
    }

    return {
      success: true,
      message: data.message || "Signed in successfully!",
      data: data.data || data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to connect to backend server.",
    };
  }
}
