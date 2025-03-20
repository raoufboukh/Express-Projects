/* eslint-disable @typescript-eslint/no-explicit-any */
import { logout } from "@/lib/dataFetching";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";

interface LogoutProps {
    item: any;
    collapsed: boolean;
    theme: any;
}

const Logout:React.FC<LogoutProps> = ({item, collapsed, theme}) => {
    const logoutMutation = useMutation({
    mutationFn: logout,
    });

    const handleLogout = () => {
    logoutMutation.mutate();
    };

  return (
    <Link
      href={item.link}
      onClick={handleLogout}
      className={`flex items-center ${
        collapsed ? "justify-center px-3" : "px-4"
      } py-3 mt-5 rounded-lg ${theme.menuItem} transition-all duration-200`}
    >
      <span className={`text-xl ${collapsed ? "" : "mr-3"}`}>
        <item.icon />
      </span>
      {!collapsed && <span className="md:block hidden">{item.title}</span>}
    </Link>
  );
}

export default Logout
