"use server";

import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_APP_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return null;
    }

    const res = await fetch(`${API_BASE_URL}/user/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    if (data.success && data.data) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}

export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    if (token) {
      await fetch(`${API_BASE_URL}/user/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).catch(() => {});
    }
  } catch (error) {
    console.error("Error logging out:", error);
  }
  return { success: true };
}

export async function forgotPasswordAction(email: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/user/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.message || "Failed to send reset code" };
    }
    return {
      success: true,
      message: data.message || `OTP sent to ${email}. Check your email.`,
    };
  } catch (error: any) {
    return { success: false, message: error.message || "Server connection error" };
  }
}

export async function resetPasswordAction(payload: {
  email: string;
  otp: string;
  newPassword: string;
}): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/user/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.message || "Password reset failed" };
    }
    return {
      success: true,
      message: data.message || "Password successfully changed!",
    };
  } catch (error: any) {
    return { success: false, message: error.message || "Server connection error" };
  }
}

export async function setPasswordAction(newPassword: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (!token) {
      return { success: false, message: "User not authenticated" };
    }

    const res = await fetch(`${API_BASE_URL}/user/set-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newPassword }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.message || "Password update failed" };
    }
    return {
      success: true,
      message: data.message || "Password updated successfully!",
    };
  } catch (error: any) {
    return { success: false, message: error.message || "Server connection error" };
  }
}

