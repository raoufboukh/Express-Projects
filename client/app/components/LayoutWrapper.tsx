"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideLayout = ["/login", "/register"].includes(pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
        {children}
      {!hideLayout && <Footer />}
    </>
  );
}
