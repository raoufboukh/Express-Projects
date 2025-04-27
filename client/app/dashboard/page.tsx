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

type User = {
  username: string;
  email: string;
  _id: string;
  role: string;
  notifications: any[];
  appointments: any[];
  scans: any[];
  accountType: string;
};

function AppSidebar() {
  const router = useRouter();
  const [activeTheme, setActiveTheme] = useState("dark");
  const [activeItem, setActiveItem] = useState("");
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
        <header className={`${theme.header} p-6`}>
          <h1
            className={`${
              activeTheme === "light" ? "text-black" : "text-white"
            } sm:text-2xl text-lg font-bold`}
          >
            Welcome to your dashboard
          </h1>
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
          ) : activeItem === "BookAppointments" ? (
            <Form />
          ) : activeItem === "Scan" ? (
            <Scan />
          ) : null}
        </main>
      </div>
    </div>
  );
}

export default AppSidebar;
