"use client";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { useState } from "react";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: true,
            retry: 1,
          },
        },
      })
  );

  const pathname = usePathname();
  const hideLayout = ["/login", "/register"].includes(pathname);

  return (
    <QueryClientProvider client={queryClient}>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </QueryClientProvider>
  );
}
