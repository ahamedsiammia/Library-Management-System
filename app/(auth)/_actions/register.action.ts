"use server";

import { cookies } from "next/headers";
import { ActionResult } from "@/types/auth.types";

export async function registerAction(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const name = formData.get("name") as string;
  const instituteName = formData.get("instituteName") as string;
  const rollRaw = formData.get("roll") as string;
  const semester = formData.get("semester") as string;
  const shift = formData.get("shift") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const roll = Number(rollRaw);

  if (!name || !instituteName || isNaN(roll) || !semester || !shift || !email || !password) {
    return {
      success: false,
      message: "Please fill out all required registration fields.",
    };
  }

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_APP_URL ;

  try {
    const res = await fetch(`${backendUrl}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        instituteName,
        roll,
        semester,
        shift,
        email,
        password,
      }),
    });

    const result = await res.json();

    const data = result.data

    if (!res.ok || data.success === false) {
      return {
        success: false,
        message: data.message || "Registration failed. Please check input values.",
      };
    }


    return {
      success: true,
      message: data.message || "Registration completed successfully!",
      data: data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to connect to backend server.",
    };
  }
}
