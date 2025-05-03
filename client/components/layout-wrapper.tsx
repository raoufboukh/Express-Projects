"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SnackbarProvider } from "notistack";

import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";

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
  const hideLayout = ["/dashboard", "/login", "/register"].some((path) =>
    pathname.startsWith(path)
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider preventDuplicate autoHideDuration={2000}>
        {!hideLayout && <Navbar />}
        {children}
        {!hideLayout && <Footer />}
      </SnackbarProvider>
    </QueryClientProvider>
  );
}
