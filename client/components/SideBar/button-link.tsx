import Link from "next/link";

type ButtonLinkProps = {
  item: any;
  theme: any;
  activeItem: string;
  collapsed: boolean;
  setActiveItem: (item: string) => void;
};

const ButtonLink: React.FC<ButtonLinkProps> = ({ item, theme, activeItem, collapsed, setActiveItem }) => {
  return !item.link ? (
    <div
      className={`flex items-center cursor-pointer ${
        collapsed ? "justify-center px-3" : "px-4"
      } py-3 rounded-lg ${
        activeItem === item.title ? theme.active : theme.menuItem
      } transition-all duration-200`}
      onClick={() => setActiveItem(item.title)}
    >
      <span className={`text-xl ${collapsed ? "" : "mr-3"}`}>
        <item.icon />
      </span>
      {!collapsed && <span className="md:block hidden">{item.title}</span>}
    </div>
  ) : (
    <Link href={item.link}>
      <div
        className={`flex items-center cursor-pointer ${
          collapsed ? "justify-center px-3" : "px-4"
        } py-3 rounded-lg ${
          activeItem === item.title ? theme.active : theme.menuItem
        } transition-all duration-200`}
        onClick={() => setActiveItem(item.title)}
      >
        <span className={`text-xl ${collapsed ? "" : "mr-3"}`}>
          <item.icon />
        </span>
        {!collapsed && <span className="md:block hidden">{item.title}</span>}
      </div>
    </Link>
  );
};

export default ButtonLink;
