import {
  BookOpen,
  Calendar,
  Home,
  Inbox,
  LogOut,
  Scan,
  ScanLine,
  User,
} from "lucide-react";
import { GiDoctorFace } from "react-icons/gi";

export const links = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Services",
    link: "/services",
  },
  {
    title: "Team",
    link: "/team",
  },
  {
    title: "Login",
    link: "/login",
  },
];

export const services = [
  {
    image: "/assets/home_clinic3_pic1.png",
    title: "Stomatology",
    description:
      "Duis dignissim mi ut laoreet mollis. Nunc id tellus finibus, eleifend mi maximus",
  },
  {
    image: "/assets/home_clinic3_pic2.png",
    title: "Vaccination",
    description:
      "Duis dignissim mi ut laoreet mollis. Nunc id tellus finibus, eleifend mi maximus",
  },
  {
    image: "/assets/home_clinic3_pic3.png",
    title: "Check-up",
    description:
      "Duis dignissim mi ut laoreet mollis. Nunc id tellus finibus, eleifend mi maximus",
  },
  {
    image: "/assets/home_clinic3_pic4.png",
    title: "Medical Help",
    description:
      "Duis dignissim mi ut laoreet mollis. Nunc id tellus finibus, eleifend mi maximus",
  },
];

export const companyFooter = [
  {
    title: "Lorem ipsum",
  },
  {
    title: " Praesent pretium",
  },
  {
    title: "Pellentesque",
  },
  {
    title: "Aliquam",
  },
];

export const helpFooter = [
  {
    title: "Etiam dapibus",
  },
  {
    title: "Nunc sit",
  },
  {
    title: "Etiam tempor",
  },
  {
    title: "Lorem ipsum",
  },
];

export const about = [
  {
    title: "Proin risus erat, fringilla vel purus",
    description:
      "Mauris rhoncus orci in imperdiet placerat. Vestibulum euismod nisl suscipit ligula volutpat, a feugiat urna maximus. Cras massa nibh, tincidunt ut eros a, vulputate consequat odio. Vestibulum vehicula tempor nulla, sed hendrerit urna interdum in.",
  },
  {
    title: "Proin risus erat, fringilla vel purus",
    description:
      "In condimentum maximus tristique. Maecenas non laoreet odio. Fusce lobortis porttitor purus, vel vestibulum libero pharetra vel. Pellentesque lorem augue, fermentum nec nibh et, fringilla sollicitudin orci. Integer pharetra magna non ante blandit lobortis. Sed mollis consequat eleifend. Aliquam consectetur orci eget dictum tristique. Aenean et sodales est, ut vestibulum lorem.",
  },
];

export const team = [
  {
    image: "/assets/home_clinic3_pic19.jpg",
    title: "Hera Glasson",
    role: "Co-founder",
    description:
      "Duis dignissim mi ut laoreet mollis. Nunc id tellus finibus, eleifend mi vel, maximus.",
    footer: "Maecenas mi tortor, pellentesque a aliquam ut, fringilla.",
  },
  {
    image: "/assets/home_clinic3_pic20.jpg",
    title: "Virgi James",
    role: "Co-founder, dentist",
    description:
      "Duis dignissim mi ut laoreet mollis. Nunc id tellus finibus, eleifend mi vel, maximus.",
    footer: "Maecenas mi tortor, pellentesque a aliquam ut, fringilla.",
  },
  {
    image: "/assets/home_clinic3_pic21.jpg",
    title: "Helen Jankinson",
    role: "Doctor",
    description:
      "Duis dignissim mi ut laoreet mollis. Nunc id tellus finibus, eleifend mi vel, maximus.",
    footer: "Maecenas mi tortor, pellentesque a aliquam ut, fringilla.",
  },
  {
    image: "/assets/home_clinic3_pic22.jpg",
    title: "Martin S. Gapard",
    role: "Doctor",
    description:
      "Duis dignissim mi ut laoreet mollis. Nunc id tellus finibus, eleifend mi vel, maximus.",
    footer: "Maecenas mi tortor, pellentesque a aliquam ut, fringilla.",
  },
];

export const linksUser = [
  {
    title: "Dashboard",
    link: "/dashboard",
    role: ["user", "admin", "doctor"],
  },
  {
    title: "Logout",
    link: "",
    role: ["user", "admin", "doctor"],
  },
];

export const dashboardLinks = [
  {
    title: "Home",
    link: "/",
    icon: Home,
    role: ["admin", "doctor", "user"],
  },
  {
    title: "Users",
    link: "",
    icon: User,
    role: ["admin"],
  },
  {
    title: "Doctors",
    link: "",
    icon: GiDoctorFace,
    role: ["admin"],
  },
  {
    title: "BookAppointments",
    link: "",
    icon: BookOpen,
    role: ["user"],
  },
  {
    title: "Appointments",
    link: "",
    icon: Calendar,
    role: ["user"],
  },
  {
    title: "Notifications",
    link: "",
    icon: Inbox,
    role: ["admin", "doctor"],
  },
  {
    title: "Scan",
    link: "",
    icon: ScanLine,
    role: ["user"],
  },
  {
    title: "Scans",
    link: "",
    icon: Scan,
    role: ["user"],
  },
  {
    title: "Logout",
    link: "/",
    icon: LogOut,
    role: ["admin", "doctor", "user"],
  },
];

export const themes = {
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