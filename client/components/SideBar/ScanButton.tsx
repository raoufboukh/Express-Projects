/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";

interface ScanButtonProps {
    item: any;
    theme: any;
    activeItem: string;
    collapsed: boolean;
    setActiveItem: (item: string) => void;
    user: { appointments: { status: string }[] };
}


const ScanButton:React.FC<ScanButtonProps> = ({ item, theme, activeItem, collapsed, setActiveItem, user }) => {
  return (
    <Link
      href={item.link}
      className={`flex items-center ${
        collapsed ? "justify-center px-3" : "px-4"
      } py-3 rounded-lg ${
        activeItem === item.title ? theme.active : theme.menuItem
      } transition-all duration-200`}
      onClick={() => {
        if(user.appointments && user.appointments.length !== 0 
            && user.appointments[0]?.status === "accepted"
        ) {
            setActiveItem(item.title);
        }else {
            alert("You don't have any appointments scheduled yet");
        }
      }}
    >
      <span className={`text-xl ${collapsed ? "" : "mr-3"}`}>
        <item.icon />
      </span>
      {!collapsed && <span className="md:block hidden">{item.title}</span>}
    </Link>
  );
};

export default ScanButton
