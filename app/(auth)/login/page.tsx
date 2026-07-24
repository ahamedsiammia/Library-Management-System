import React from "react";
import LoginComponent from "../_components/LoginComponent";

export default function LoginPage() {
  return (
    <div className="w-full max-w-xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-teal-100/50 p-6 md:p-8">
      <LoginComponent />
    </div>
  );
}
