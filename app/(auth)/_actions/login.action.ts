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
    process.env.NEXT_PUBLIC_API_URL ||
    "https://library-management-system-backend-fawn.vercel.app";

  try {
    const res = await fetch(`${backendUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok || data.success === false) {
      return {
        success: false,
        message: data.message || "Invalid credentials or login failed.",
      };
    }

    const token = data.accessToken || data.token || data.data?.accessToken;
    if (token) {
      const cookieStore = await cookies();
      cookieStore.set("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
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


