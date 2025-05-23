import { motion } from "framer-motion";
import { useState } from "react";

import { dashboardLinks, themes } from "../constants";
import Logout from "./Logout";
import ScanButton from "./scan-button";
import ButtonLink from "./button-link";
import NotificationAppointments from "./NotificationAppointments";
import Image from "next/image";
import Link from "next/link";

type SidebarProps = {
  activeItem: string;
  setActiveItem: (item: string) => void;
  activeTheme: string;
  setActiveTheme: (theme: string) => void;
  user: any;
  setUser: (user: any) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  activeItem,
  setActiveItem,
  activeTheme,
  setActiveTheme,
  user,
  setUser,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const theme = themes[activeTheme as keyof typeof themes];

  return (
    <motion.aside
      className={`${theme.sidebar} ${
        collapsed ? "w-20" : "md:w-64 w-20"
      } flex flex-col h-full transition-all duration-300 ease-in-out shadow-lg`}
      initial={{ x: -10, opacity: 0.8 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`${theme.header} p-4 flex items-center justify-between`}>
        {!collapsed && (
          <Link href="/" className="flex items-center justify-center w-full">
            <Image
              src="/assets/logo.png"
              alt="Logo"
              width={150}
              height={50}
              className="md:block hidden"
            />
            <Image
              src="/assets/home_clinic3_pic5.png"
              alt="Logo"
              width={50}
              height={50}
              className="md:hidden size-7"
            />
          </Link>
        )}
        <button
          type="button"
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

      {!collapsed && user?.accountType === "premium" && (
        <div className="px-4 py-3">
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setActiveTheme("dark")}
              className={`md:size-6 size-3 rounded-full bg-[#1A1D23] border ${
                activeTheme === "dark" ? "border-white" : "border-transparent"
              } cursor-pointer`}
            />
            <button
              type="button"
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

      <div className="flex-1 overflow-y-auto py-4 scrollbar-custom">
        <ul className="space-y-1 px-3">
          {dashboardLinks.map(
            (item) =>
              item.role.includes(user ? user.role : "") &&
              (item.title === "Logout" ? (
                <li key={item.title} className="mt-auto pt-4">
                  <Logout item={item} collapsed={collapsed} theme={theme} />
                </li>
              ) : item.title === "Scan" ? (
                <li key={item.title}>
                  <ScanButton
                    item={item}
                    theme={theme}
                    collapsed={collapsed}
                    setActiveItem={setActiveItem}
                    activeItem={activeItem}
                    user={user}
                  />
                </li>
              ) : item.title === "Notifications" ||
                item.title === "Appointments" ||
                item.title === "Results Scans" ||
                item.title === "Results-Xray" ? (
                <li key={item.title}>
                  <NotificationAppointments
                    item={item}
                    theme={theme}
                    activeItem={activeItem}
                    collapsed={collapsed}
                    setActiveItem={setActiveItem}
                    user={user}
                    setUser={setUser}
                  />
                </li>
              ) : (
                <li key={item.title}>
                  <ButtonLink
                    item={item}
                    theme={theme}
                    collapsed={collapsed}
                    setActiveItem={setActiveItem}
                    activeItem={activeItem}
                    user={user}
                  />
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
                ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
                : ""}
            </p>
          </div>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
