"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[400px] w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
    </div>
  );
}
