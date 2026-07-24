import type { Metadata } from "next";
import "./globals.css";
import { Outfit, Oxanium } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const oxaniumHeading = Oxanium({ subsets: ["latin"], variable: "--font-heading" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "LMS - Library Management System",
  description: "Digital Library Management System built with Next.js and TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", outfit.variable, oxaniumHeading.variable)}
    >
      <body className="min-h-screen bg-slate-50 text-gray-800 font-sans flex flex-col">
        {children}
        <Toaster position="top-right" richColors />
        <ToastContainer position="top-center" />
      </body>
    </html>
  );
}
