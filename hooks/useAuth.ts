"use client";

import { useState, useEffect } from "react";
import { UserProfile } from "@/types/user.types";
import { getCurrentUser } from "@/app/(auth)/_actions/auth.actions";

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    try {
      const data = await getCurrentUser();
      if (data) {
        setUser(data as UserProfile);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, refetch: fetchUser };
}
