"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { themes } from "@/components/constants";

import Users from "@/components/Users/Users";
import { check } from "@/lib/data-fetching";
import Sidebar from "@/components/SideBar/Sidebar";
import Doctors from "@/components/Doctors/Doctors";
import Notifications from "@/components/Notification/Notifications";
import Appointments from "@/components/Appointment/Appointments";
import Scans from "@/components/Scans/Scans";
import Scan from "@/components/Scans/Scan";
import Form from "@/components/Appointment/form-app";
import Settings from "@/components/Settings/Settings";
import Xray from "@/components/Scans/Xray";
import { FaCrown } from "react-icons/fa";
import Plan from "@/components/Pricing/Plan";
import PaymentForm from "@/components/Pricing/Payment";

type User = {
  username: string;
  email: string;
  _id: string;
  role: string;
  notifications: any[];
  appointments: any[];
  scans: any[];
  accountType: string;
  accountTypeExpire?: string;
};

function AppSidebar() {
  const router = useRouter();
  const [activeTheme, setActiveTheme] = useState("dark");
  const [activeItem, setActiveItem] = useState("Book-Appointments");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await check();
        if (!data) {
          router.push("/");
        }
        setUser(data);
        if (data.accountType === "premium") {
          setActiveTheme("blue");
        } else {
          setActiveTheme("dark");
        }
      } catch (err) {
        console.error("Error during auth check:", err);
      }
    };
    checkAuth();
  }, []);

  const theme = themes[activeTheme as keyof typeof themes];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        activeTheme={activeTheme}
        setActiveTheme={setActiveTheme}
        user={user}
        setUser={setUser}
      />

      <div className={`flex-1 ${theme.main} overflow-y-auto`}>
        <header
          className={`${theme.header} px-6 py-4 sm:py-3.5 md:py-3.5 flex items-center justify-between`}
        >
          <h1
            className={`${
              activeTheme === "light" ? "text-black" : "text-white"
            } sm:text-2xl text-xs font-bold`}
          >
            Welcome to your dashboard
          </h1>
          {user?.role !== "admin" &&
            (user?.accountType === "basic" ? (
              <p
                className="flex items-center gap-2 bg-primary/60 text-white hover:bg-primary/70 transition-all duration-300 px-3 py-2 rounded-4xl cursor-pointer"
                onClick={() => setActiveItem("Pricing")}
              >
                <FaCrown />{" "}
                <span className="md:block hidden">Upgrade Premium</span>{" "}
              </p>
            ) : (
              <div className="flex items-center flex-col sm:text-base my-2 text-xs">
                <p className="text-white">
                  {user?.accountTypeExpire
                    ? new Date(
                        new Date(user.accountTypeExpire).getTime() + 60 * 1000
                      ).toLocaleString()
                    : ""}
                </p>
              </div>
            ))}
        </header>
        <main className="p-6">
          {activeItem === "" ? (
            <div className="bg-white dark:bg-[#1A1D23] rounded-lg shadow-sm p-6">
              <p className="text-gray-600 dark:text-gray-300">
                Choose an option in the menu to start.
              </p>
            </div>
          ) : activeItem === "Users" ? (
            <Users info={user} />
          ) : activeItem === "Doctors" ? (
            <Doctors user={user} />
          ) : activeItem === "Notifications" ? (
            <Notifications />
          ) : activeItem === "Appointments" ? (
            <Appointments />
          ) : activeItem === "Results Scans" ? (
            <Scans />
          ) : activeItem === "Book-Appointments" ? (
            <Form />
          ) : activeItem === "Scan" ? (
            <Scan />
          ) : activeItem === "Settings" ? (
            <Settings user={user} />
          ) : activeItem === "Results-Xray" ? (
            <Xray />
          ) : activeItem === "Pricing" ? (
            <Plan user={user} setActiveItem={setActiveItem} />
          ) : (
            <PaymentForm />
          )}
        </main>
      </div>
    </div>
  );
}

export default AppSidebar;
