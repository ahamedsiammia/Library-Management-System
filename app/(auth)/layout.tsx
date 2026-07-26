import React from "react";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

const AuthLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4 py-12 container mx-auto">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
