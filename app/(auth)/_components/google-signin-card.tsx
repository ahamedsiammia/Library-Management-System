"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { toast } from "sonner";

export function GoogleSignInCard({
  clientId,
}: {
  clientId: string;
}) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (!scriptReady || !buttonRef.current) return;

    if (!window.google) {
      toast.error("Google Sign-In load hoy nai. Page refresh kore abar try korun.");
      return;
    }

    if (!clientId) {
      toast.error("Google Client ID paoa jayni. Admin-er sathe jogajog korun.");
      return;
    }

    try {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response) => {
          if (!response.credential) {
            toast.error("Google theke login information paoa jayni. Abar try korun.");
            return;
          }

          const toastId = toast.loading("Google diye login hocche...");

          try {
            console.log("Google ID Token:", response.credential);

            // TODO: ekhane apnar backend API call korben, jemon:
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_APP_URL}/user/google`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ idToken: response.credential }),
            });
            if (!res.ok) throw new Error("Login failed");

            toast.success("Login successful!", { id: toastId });

            const result = await res.json();
            const token = result.data
            const {accessToken,refreshToken} = token;
            console.log({accessToken :accessToken,refreshToken :refreshToken },"this is google api response");

          } catch (error) {
            toast.error(
              error instanceof Error
                ? error.message
                : "Login korte problem hoyeche. Abar try korun.",
              { id: toastId }
            );
          }
        },
      });

      buttonRef.current.innerHTML = "";

      window.google.accounts.id.renderButton(buttonRef.current, {
        type: "standard",
        shape: "rectangular",
        theme: "outline",
        size: "large",
        width: 400,
        text: "continue_with",
      });
    } catch {
      toast.error("Google Sign-In setup korte problem hoyeche.");
    }
  }, [scriptReady, clientId]);

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
        onError={() =>
          toast.error("Google script load hoy nai. Internet connection check korun.")
        }
      />

      <div className="flex justify-center">
        <div ref={buttonRef} />
      </div>
    </>
  );
}