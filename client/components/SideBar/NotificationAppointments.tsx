import { check } from "@/lib/data-fetching";
import React from "react";
interface NotificationAppointmentsProps {
  item: any;
  theme: any;
  activeItem: string;
  collapsed: boolean;
  setActiveItem: (item: string) => void;
  user: any;
  setUser: (user: any) => void;
}

const NotificationAppointments: React.FC<NotificationAppointmentsProps> = ({
  item,
  theme,
  activeItem,
  collapsed,
  setActiveItem,
  user,
  setUser,
}) => {
  const [isNotification, setIsNotification] = React.useState(
    user.notifications.length
  );
  const [isAppointment, setIsAppointment] = React.useState(
    user.appointments.length
  );
  const [isResults, setIsResults] = React.useState(user.appointments.length);
  const [Scans, setScans] = React.useState(user.scanResults.length);

  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await check();
        setUser(data);
        setIsNotification(data.notifications.length);
        setIsAppointment(data.appointments.length);
        setIsResults(data.results.length);
        setScans(data.scanResults.length);
      } catch (err) {
        console.error("Error during auth check:", err);
      }
    };
    checkAuth();
    const intervalId = setInterval(checkAuth, 1000);
    return () => clearInterval(intervalId);
  }, []);
  return item.title === "Notifications" ? (
    <div
      className={`flex items-center cursor-pointer ${
        collapsed ? "justify-center px-3" : "px-4"
      } py-3 rounded-lg ${
        user.accountType === "basic" && activeItem === item.title
          ? theme.active
          : user.accountType === "premium" && activeItem === item.title
          ? theme.premiumActive
          : theme.menuItem
      } transition-all duration-200`}
      onClick={() => setActiveItem(item.title)}
    >
      <span className={`text-xl relative block ${collapsed ? "" : "mr-3"}`}>
        <div
          className={`absolute bg-red-500 size-3 rounded-full top-0 right-0 flex justify-center items-center text-xs ${
            isNotification <= 0 ? "hidden" : "block"
          }`}
        >
          {isNotification}
        </div>
        <item.icon />
      </span>
      {!collapsed && <span className="md:block hidden">{item.title}</span>}
    </div>
  ) : item.title === "Appointments" ? (
    <div
      className={`flex items-center cursor-pointer ${
        collapsed ? "justify-center px-3" : "px-4"
      } py-3 rounded-lg ${
        user.accountType === "basic" && activeItem === item.title
          ? theme.active
          : user.accountType === "premium" && activeItem === item.title
          ? theme.premiumActive
          : theme.menuItem
      } transition-all duration-200`}
      onClick={() => setActiveItem(item.title)}
    >
      <span className={`text-xl relative block ${collapsed ? "" : "mr-3"}`}>
        <div
          className={`absolute bg-red-500 size-3 rounded-full top-0 right-0 flex justify-center items-center text-xs ${
            isAppointment <= 0 ? "hidden" : "block"
          }`}
        >
          {isAppointment}
        </div>
        <item.icon />
      </span>
      {!collapsed && <span className="md:block hidden">{item.title}</span>}
    </div>
  ) : item.title === "Results-Xray" ? (
    <div
      className={`flex items-center cursor-pointer ${
        collapsed ? "justify-center px-3" : "px-4"
      } py-3 rounded-lg ${
        user.accountType === "basic" && activeItem === item.title
          ? theme.active
          : user.accountType === "premium" && activeItem === item.title
          ? theme.premiumActive
          : theme.menuItem
      } transition-all duration-200`}
      onClick={() => setActiveItem(item.title)}
    >
      <span className={`text-xl relative block ${collapsed ? "" : "mr-3"}`}>
        <div
          className={`absolute bg-red-500 size-3 rounded-full top-0 right-0 flex justify-center items-center text-xs ${
            isResults <= 0 ? "hidden" : "block"
          }`}
        >
          {isResults}
        </div>
        <item.icon />
      </span>
      {!collapsed && <span className="md:block hidden">{item.title}</span>}
    </div>
  ) : (
    <div
      className={`flex items-center cursor-pointer ${
        collapsed ? "justify-center px-3" : "px-4"
      } py-3 rounded-lg ${
        user.accountType === "basic" && activeItem === item.title
          ? theme.active
          : user.accountType === "premium" && activeItem === item.title
          ? theme.premiumActive
          : theme.menuItem
      } transition-all duration-200`}
      onClick={() => setActiveItem(item.title)}
    >
      <span className={`text-xl relative block ${collapsed ? "" : "mr-3"}`}>
        <div
          className={`absolute bg-red-500 size-3 rounded-full top-0 right-0 flex justify-center items-center text-xs ${
            Scans <= 0 ? "hidden" : "block"
          }`}
        >
          {Scans}
        </div>
        <item.icon />
      </span>
      {!collapsed && <span className="md:block hidden">{item.title}</span>}
    </div>
  );
};

export default NotificationAppointments;
