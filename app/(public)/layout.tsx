import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import React from "react";

const PublicLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default PublicLayout;
