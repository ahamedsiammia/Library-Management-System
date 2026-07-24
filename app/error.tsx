"use client";

import React, { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-4 text-center">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Something went wrong!</h2>
      <p className="text-slate-600 text-sm mb-6">{error.message || "An unexpected error occurred."}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-2.5 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}

