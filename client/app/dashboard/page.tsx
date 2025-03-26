/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { check, logout } from "@/lib/dataFetching";
import { useRouter } from "next/navigation";
import { dashboardLinks } from "@/components/constants";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Users from "@/components/Users/Users";
import Doctors from "@/components/Doctors/Doctors";
import Notifications from "@/components/Notification/Notifications";
import Appointments from "@/components/Appointment/Appointments";
import Scans from "@/components/Scans/Scans";
import BookApp from "@/components/Appointment/BookApp";

interface User {
  username: string;
  email: string;
  _id: string;
  role: string;
  notifications: any[];
  appointments: any[];
  scans: any[];
  typeAccount: string;
}

const AppSidebar = () => {
  const router = useRouter();
  const [activeTheme, setActiveTheme] = useState("dark");
  const [activeItem, setActiveItem] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const logoutMutation = useMutation({
    mutationFn: logout,
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await check();
        if (!data) {
          router.push("/");
        }
        setUser(data);
      } catch (err) {
        console.error("Error during auth check:", err);
      }
    };
    checkAuth();
  }, []);

  const themes = {
    dark: {
      sidebar: "bg-[#1A1D23] text-white",
      header: "bg-[#1A1D23] border-b border-[#2A2F3A]",
      menuItem: "hover:bg-[#2D3139] text-gray-300 hover:text-white",
      active: "bg-[#2D3139] text-white",
      button: "bg-indigo-600 hover:bg-indigo-700 text-white",
      main: "bg-[#F8F9FB] dark:bg-[#121317]",
    },
    light: {
      sidebar: "bg-white text-gray-800 border-r border-gray-200",
      header: "bg-white border-b border-gray-200",
      menuItem: "hover:bg-gray-100 text-gray-600 hover:text-gray-900",
      active: "bg-gray-100 text-indigo-600",
      button: "bg-indigo-600 hover:bg-indigo-700 text-white",
      main: "bg-gray-50",
    },
    blue: {
      sidebar: "bg-[#0F172A] text-white",
      header: "bg-[#0F172A] border-b border-[#1E293B]",
      menuItem: "hover:bg-[#1E293B] text-blue-300 hover:text-white",
      active: "bg-blue-700/30 text-white",
      button: "bg-blue-600 hover:bg-blue-700 text-white",
      main: "bg-[#F8FAFC]",
    },
  };

  const theme = themes[activeTheme as keyof typeof themes];

  return (
    <div className="flex h-screen overflow-hidden">
      <motion.aside
        className={`${theme.sidebar} ${
          collapsed ? "w-20" : "md:w-64 w-20"
        } flex flex-col h-full transition-all duration-300 ease-in-out shadow-lg`}
        initial={{ x: -10, opacity: 0.8 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={`${theme.header} p-4 flex items-center justify-between`}
        >
          {!collapsed && (
            <h1 className="text-xl font-bold hidden md:block">Dashboard</h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-full hover:bg-white/10 md:block hidden"
          >
            {collapsed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            )}
          </button>
        </div>

        {!collapsed && (
          <div className="px-4 py-3">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTheme("dark")}
                className={`md:size-6 size-3 rounded-full bg-[#1A1D23] border ${
                  activeTheme === "dark" ? "border-white" : "border-transparent"
                } cursor-pointer`}
              />
              <button
                onClick={() => setActiveTheme("light")}
                className={`md:size-6 size-3 rounded-full bg-white border ${
                  activeTheme === "light"
                    ? "border-indigo-600"
                    : "border-gray-300"
                } cursor-pointer`}
              />
              <button
                onClick={() => setActiveTheme("blue")}
                className={`md:size-6 size-3 rounded-full bg-[#0F172A] border ${
                  activeTheme === "blue"
                    ? "border-blue-400"
                    : "border-transparent"
                } cursor-pointer`}
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {dashboardLinks.map(
              (item) =>
                item.role.includes(user ? user.role : "") &&
                (item.title !== "Logout" ? (
                  <li key={item.title}>
                    <Link
                      href={item.link}
                      className={`flex items-center ${
                        collapsed ? "justify-center px-3" : "px-4"
                      } py-3 rounded-lg ${
                        activeItem === item.title
                          ? theme.active
                          : theme.menuItem
                      } transition-all duration-200`}
                      onClick={() => setActiveItem(item.title)}
                    >
                      <span className={`text-xl ${collapsed ? "" : "mr-3"}`}>
                        <item.icon />
                      </span>
                      {!collapsed && (
                        <span className="md:block hidden">{item.title}</span>
                      )}
                    </Link>
                  </li>
                ) : (
                  <li key={item.title} className="mt-auto pt-4">
                    <Link
                      href={item.link}
                      onClick={handleLogout}
                      className={`flex items-center ${
                        collapsed ? "justify-center px-3" : "px-4"
                      } py-3 mt-5 rounded-lg ${
                        theme.menuItem
                      } transition-all duration-200`}
                    >
                      <span className={`text-xl ${collapsed ? "" : "mr-3"}`}>
                        <item.icon />
                      </span>
                      {!collapsed && (
                        <span className="md:block hidden">{item.title}</span>
                      )}
                    </Link>
                  </li>
                ))
            )}
          </ul>
        </div>

        <div className={`${theme.header} p-4 mt-auto flex items-center`}>
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium hidden md:block">
                {user
                  ? user.username.charAt(0).toUpperCase() +
                    user.username.slice(1)
                  : ""}
              </p>
            </div>
          )}
        </div>
      </motion.aside>

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
            <Users />
          ) : activeItem === "Doctors" ? (
            <Doctors />
          ) : activeItem === "Notifications" ? (
            <Notifications />
          ) : activeItem === "Appointments" ? (
            <Appointments />
          ) : activeItem === "Scans" ? (
            <Scans />
          ) : activeItem === "BookAppointments" ? (
            <BookApp />
          ) : null}
        </main>
      </div>
    </div>
  );
};

export default AppSidebar;