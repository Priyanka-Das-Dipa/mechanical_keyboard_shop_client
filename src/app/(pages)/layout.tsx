import Footer from "@/src/components/shared/Footer";
import Navbar from "@/src/components/shared/Navbar";
import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="container mx-auto min-h-screen mt-2">{children}</div>
      <Footer />
    </>
  );
}
