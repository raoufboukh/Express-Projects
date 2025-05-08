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
        user.accountType === "basic" && user.role !== "admin"
          ? "hidden"
          : activeItem === item.title
          ? user.accountType === "premium"
            ? theme.premiumActive
            : theme.active
          : theme.menuItem
      } transition-all duration-200`}
      onClick={() => {
        setActiveItem(item.title);
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
