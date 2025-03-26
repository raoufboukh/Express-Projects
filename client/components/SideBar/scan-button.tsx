import Link from "next/link";
import { enqueueSnackbar } from "notistack";

type ScanButtonProps = {
  item: any;
  theme: any;
  activeItem: string;
  collapsed: boolean;
  setActiveItem: (item: string) => void;
  user: any;
};

const ScanButton: React.FC<ScanButtonProps> = ({
  item,
  theme,
  activeItem,
  collapsed,
  setActiveItem,
  user,
}) => {
  return (
    <div
      className={`flex items-center cursor-pointer ${
        collapsed ? "justify-center px-3" : "px-4"
      } py-3 rounded-lg ${
        activeItem === item.title ? theme.active : theme.menuItem
      } transition-all duration-200`}
      onClick={() => {
        if (
          user.role === "admin" ||
          user.role === "doctor" ||
          user.accountType === "premium"
        ) {
          setActiveItem(item.title);
        } else if (
          user.appointments &&
          user.appointments.length !== 0 &&
          user.appointments[0]?.status === "accepted"
        ) {
          setActiveItem(item.title);
        } else {
          enqueueSnackbar("You need to have an accepted appointment to scan", {
            variant: "warning",
          });
        }
      }}
    >
      <span className={`text-xl ${collapsed ? "" : "mr-3"}`}>
        <item.icon />
      </span>
      {!collapsed && <span className="md:block hidden">{item.title}</span>}
    </div>
  );
};

export default ScanButton;
