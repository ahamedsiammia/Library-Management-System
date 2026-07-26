import type { Metadata } from "next";
import "./globals.css";
import { Outfit, Oxanium } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

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
      suppressHydrationWarning
      className={cn("h-full antialiased font-sans", outfit.variable, oxaniumHeading.variable)}
    >
      <body className="min-h-screen bg-background text-foreground font-sans flex flex-col transition-colors duration-300">
        <ThemeProvider>
          {children}
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
