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
import { faXRay, faBrain, faLungs, faHeartbeat } from "@fortawesome/free-solid-svg-icons";



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
    title: "Scan",
    link: "/scan",
  },
  {
    title: "Login",
    link: "/login",
  },
];

export const services = [
  {
      image: "/assets/xray.png",
      title: "X-ray Scan",
      description: "Quick and painless imaging technique that uses electromagnetic radiation to capture images of bones, lungs, and other dense structures inside the body."
  },
  {
      image: "/assets/ctscan.png",
      title: "CT Scan",
      description: "Computed tomography (CT) scan provides detailed cross-sectional images of bones, blood vessels, and soft tissues, helping diagnose various conditions, including tumors and internal injuries."
  },
  {
      image: "/assets/ultrasound.png",
      title: "Ultrasound",
      description: "Non-invasive imaging method that uses high-frequency sound waves to visualize organs, tissues, and blood flow, commonly used for pregnancy monitoring and abdominal examinations."
  },
  {
      image: "/assets/mri.jpg",
      title: "MRI",
      description: "Magnetic Resonance Imaging (MRI) uses strong magnetic fields and radio waves to generate detailed images of organs and soft tissues, ideal for diagnosing brain, spinal cord, and joint conditions."
  }
];


export const companyFooter = [
  { title: "About Us", link: "/about" },
  { title: "Our Services", link: "/services" },
  { title: "Careers", link: "/careers" },
  { title: "Contact", link: "/contact" },
];

export const helpFooter = [
  { title: "FAQs", link: "/faq" },
  { title: "Support", link: "/support" },
  { title: "Privacy Policy", link: "/privacy-policy" },
  { title: "Terms of Service", link: "/terms" },
];
export const machines = [
  {
    name: "X-ray Machine",
    image: "assets/xraymachine.png",
    description:
      "First introduced: 2025. X-ray machines use electromagnetic radiation to capture images of bones and internal structures. They are widely used to detect fractures, infections, lung conditions like pneumonia, and certain tumors by passing X-rays through the body and capturing the resulting image on a detector.",
  },
  {
    name: "CT Scan Machine",
    image: "assets/ctscanmachine.png",
    description:
      "First introduced: 2024. A CT scanner (Computed Tomography) uses X-ray beams and computer processing to create detailed cross-sectional images of the body. It is useful for diagnosing tumors, internal bleeding, fractures, and diseases by rotating around the patient and reconstructing 3D images from multiple angles.",
  },
  {
    name: "MRI Machine",
    image: "assets/irm.jpg",
    description:
      "First introduced: 2021. MRI (Magnetic Resonance Imaging) uses strong magnetic fields and radio waves to generate highly detailed images of soft tissues, the brain, muscles, and internal organs. It is particularly effective in detecting brain disorders, spinal cord injuries, and tumors without using radiation.",
  },
  {
    name: "Ultrasound Machine",
    image: "assets/ultrasoundmachine.jpg",
    description:
      "First introduced: 2024. Ultrasound machines use high-frequency sound waves to create images of internal body structures. They are commonly used for monitoring pregnancies, diagnosing heart conditions, liver diseases, and detecting abnormalities in soft tissues by analyzing the echoes from the sound waves.",
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


export const radiologists = [
  {
    image: "/assets/avatar.png",
    name: "Dr. Nacera Semra",
    role: "Radiologist",
    location: "Constantine, Algeria",
    timing: "Sunday - Thursday, 9AM - 4PM",
  },
  {
    image: "/assets/avatar.png",
    name: "Dr. Hacene Namous",
    role: "Radiologist",
    location: "Constantine, Algeria",
    timing: "Tuesday - Saturday, 10AM - 4PM",
  },
  {
    image: "/assets/avatar.png",
    name: "Dr. Adib Azzoug",
    role: "Radiologist",
    location: "Constantine, Algeria",
    timing: "Sunday - Thursday, 8AM - 3PM",
  },
  {
    image: "/assets/avatar.png",
    name: "Dr. Norhane Chadli",
    role: "Diagnostic & Interventional Radiologist",
    location: "Constantine, Algeria",
    timing: "Wednesday - Sunday, 9AM - 2PM",
  },
];

export const pneumologists = [
  {
    image: "/assets/avatar.png",
    name: "Dr. Narimene Koreichi",
    role: "Pneumologist",
    location: "El Khroub, Constantine, Algeria",
    timing: "Sunday - Wednesday, 9AM - 4PM",
  },
  {
    image: "/assets/avatar.png",
    name: "Dr. Djamila Harbi",
    role: "Pneumologist",
    location: "Constantine, Algeria",
    timing: "Tuesday - Saturday, 10AM - 3PM",
  },
  {
    image: "/assets/avatar.png",
    name: "Dr. Amel Dehmachi",
    role: "Pneumologist",
    location: "Constantine, Algeria",
    timing: "Monday - Thursday, 8AM - 3PM",
  },
  {
    image: "/assets/avatar.png",
    name: "Dr. Malika Haouchine",
    role: "Pneumologist",
    location: "Constantine, Algeria",
    timing: "Wednesday - Sunday, 9AM - 2PM",
  },
];
export const faqs = [
  {
    question: "What services does your laboratory provide?",
    answer: "We offer various medical imaging services, including X-ray, CT scan, MRI, ultrasound, and lung imaging.",
  },
  {
    question: "Are X-rays dangerous?",
    answer: "X-rays use a low dose of radiation, which is considered safe for diagnostic purposes. However, frequent exposure should be minimized, and precautions are taken, especially for pregnant women and children.",
  },
  {
    question: "In which cases is an MRI (IRM) used?",
    answer: "MRI (IRM) is used to examine soft tissues, the brain, spinal cord, joints, and internal organs without using radiation.",
  },
  {
    question: "What is the difference between a CT scan and an MRI?",
    answer: "A CT scan uses X-rays to create detailed images of bones, organs, and tissues, while MRI uses magnetic fields and radio waves, making it better suited for soft tissue analysis.",
  },
  {
    question: "Do I need a doctor's prescription for an imaging test?",
    answer: "Yes, most imaging tests require a prescription from your healthcare provider, except for certain preventive screenings.",
  },
  {
    question: "How do I book an appointment?",
    answer: "You can book an appointment online through our website or call our reception desk for assistance.",
  },
  {
    question: "How should I prepare for my imaging exam?",
    answer: "Preparation depends on the type of exam. Some require fasting, while others need contrast injections. Your doctor will provide specific instructions.",
  },
  {
    question: "When is a CT scan necessary?",
    answer: "A CT scan is commonly used for detecting fractures, tumors, lung diseases, and internal bleeding.",
  },
  {
    question: "Are ultrasounds only used for pregnancy?",
    answer: "No, ultrasounds are used for various diagnostic purposes, including examining the heart, abdomen, blood vessels, and muscles.",
  },
  {
    question: "When will I receive my results?",
    answer: "Results are usually available within 24-48 hours. Urgent cases can be prioritized.",
  },
];
export const scanSteps = [
  {
    id: 1,
    title: "Appointment & Registration",
    description:
      "Schedule your scan online or visit our center. Our staff will assist you with the registration process.",
  },
  {
    id: 2,
    title: "Scanning Procedure",
    description:
      "Our radiologists perform the scan using high-resolution imaging technology in a safe and comfortable environment.",
  },
  {
    id: 3,
    title: "Analysis & Diagnosis",
    description:
      "Our AI-powered system assists experts in analyzing the scans for accurate diagnosis.",
  },
  {
    id: 4,
    title: "Report & Results",
    description:
      "Your results are securely uploaded to your patient portal. You will receive a detailed report with recommendations.",
  },
];
export const servicesDetails = [
  {
    icon: faXRay,
    title: "X-ray Scan",
    description: "X-rays help detect fractures, infections, and lung diseases by capturing images of dense structures inside the body.",
    procedure: "A small amount of radiation is passed through the body to create an image.",
    preparation: "Minimal preparation is required. Remove metal objects before the scan."
  },
  {
    icon: faBrain,
    title: "MRI Scan",
    description: "MRI uses magnetic fields and radio waves to create detailed images of soft tissues, ideal for brain and joint diagnostics.",
    procedure: "The patient lies in a scanner while magnetic fields generate images.",
    preparation: "Remove metal objects. Inform the technician of any implants."
  },
  {
    icon: faLungs,
    title: "CT Scan",
    description: "CT scans provide cross-sectional images of bones, blood vessels, and organs.",
    procedure: "The patient lies on a moving table that passes through an X-ray scanner.",
    preparation: "Fasting may be required if contrast dye is used."
  },
  {
    icon: faHeartbeat,
    title: "Ultrasound",
    description: "Ultrasound uses sound waves to visualize internal organs and blood flow.",
    procedure: "A gel is applied, and a handheld probe captures real-time images.",
    preparation: "Drink water for a full bladder before pelvic exams."
  }
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
