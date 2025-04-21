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
import {
  faXRay,
  faBrain,
  faLungs,
  faHeartbeat,
} from "@fortawesome/free-solid-svg-icons";

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
    title: "Pricing",
    link: "/pricing",
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
    description:
      "Quick and painless imaging technique that uses electromagnetic radiation to capture images of bones, lungs, and other dense structures inside the body.",
  },
  {
    image: "/assets/ctscan.png",
    title: "CT Scan",
    description:
      "Computed tomography (CT) scan provides detailed cross-sectional images of bones, blood vessels, and soft tissues, helping diagnose various conditions, including tumors and internal injuries.",
  },
  {
    image: "/assets/ultrasound.png",
    title: "Ultrasound",
    description:
      "Non-invasive imaging method that uses high-frequency sound waves to visualize organs, tissues, and blood flow, commonly used for pregnancy monitoring and abdominal examinations.",
  },
  {
    image: "/assets/mri.jpg",
    title: "MRI",
    description:
      "Magnetic Resonance Imaging (MRI) uses strong magnetic fields and radio waves to generate detailed images of organs and soft tissues, ideal for diagnosing brain, spinal cord, and joint conditions.",
  },
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

export const testimonials = [
  {
    text: "The imaging services were top-notch. The MRI scan was quick, and the results were explained clearly. Highly recommend!",
    name: "Sarah L.",
    position: "Patient",
  },
  {
    text: "Great experience with the ultrasound service. The staff was professional, and the process was smooth and stress-free.",
    name: "Bouraoui J.",
    position: "Patient",
  },
  {
    text: "I was impressed with the accuracy of my CT scan results. The radiologists were very helpful and answered all my questions.",
    name: "Bouaziz K.",
    position: "Patient",
  },
];

export const machines = [
  {
    name: "X-ray Machine",
    image: "/assets/xraymachine.png",
    description:
      "First introduced: 2025. X-ray machines use electromagnetic radiation to capture images of bones and internal structures. They are widely used to detect fractures, infections, lung conditions like pneumonia, and certain tumors by passing X-rays through the body and capturing the resulting image on a detector.",
  },
  {
    name: "CT Scan Machine",
    image: "/assets/ctscanmachine.png",
    description:
      "First introduced: 2024. A CT scanner (Computed Tomography) uses X-ray beams and computer processing to create detailed cross-sectional images of the body. It is useful for diagnosing tumors, internal bleeding, fractures, and diseases by rotating around the patient and reconstructing 3D images from multiple angles.",
  },
  {
    name: "MRI Machine",
    image: "/assets/irm.jpg",
    description:
      "First introduced: 2021. MRI (Magnetic Resonance Imaging) uses strong magnetic fields and radio waves to generate highly detailed images of soft tissues, the brain, muscles, and internal organs. It is particularly effective in detecting brain disorders, spinal cord injuries, and tumors without using radiation.",
  },
  {
    name: "Ultrasound Machine",
    image: "/assets/ultrasoundmachine.jpg",
    description:
      "First introduced: 2024. Ultrasound machines use high-frequency sound waves to create images of internal body structures. They are commonly used for monitoring pregnancies, diagnosing heart conditions, liver diseases, and detecting abnormalities in soft tissues by analyzing the echoes from the sound waves.",
  },
];

export const aboutInfo = [
  {
    title: "Beclinic",
    paragraph1: "Localisation",
    paragraph2: "Constantine, Algeria",
    image: "/assets/localisation-icon.png",
  },
  {
    title: "Ultrasound",
    paragraph1: "Irm",
    paragraph2: "Scanner",
    image: "/assets/call-icon.png",
  },
];

export const about = [
  {
    label: "Expert Radiologists",
    value: 95,
    description: "Highly trained professionals ensuring accurate diagnoses.",
    color: "#FFD700",
  },
  {
    label: "Advanced Technology",
    value: 90,
    description: "Modern imaging machines provide high-quality results.",
    color: "#1E90FF",
  },
  {
    label: "Fast & Reliable",
    value: 92,
    description: "AI-powered analysis ensures quick and precise reports.",
    color: "#FF4500",
  },
  {
    label: "Comprehensive Care",
    value: 88,
    description: "Personalized assistance and patient-friendly procedures.",
    color: "#32CD32",
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
    answer:
      "We offer various medical imaging services, including X-ray, CT scan, MRI, ultrasound, and lung imaging.",
  },
  {
    question: "Are X-rays dangerous?",
    answer:
      "X-rays use a low dose of radiation, which is considered safe for diagnostic purposes. However, frequent exposure should be minimized, and precautions are taken, especially for pregnant women and children.",
  },
  {
    question: "In which cases is an MRI (IRM) used?",
    answer:
      "MRI (IRM) is used to examine soft tissues, the brain, spinal cord, joints, and internal organs without using radiation.",
  },
  {
    question: "What is the difference between a CT scan and an MRI?",
    answer:
      "A CT scan uses X-rays to create detailed images of bones, organs, and tissues, while MRI uses magnetic fields and radio waves, making it better suited for soft tissue analysis.",
  },
  {
    question: "Do I need a doctor's prescription for an imaging test?",
    answer:
      "Yes, most imaging tests require a prescription from your healthcare provider, except for certain preventive screenings.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "You can book an appointment online through our website or call our reception desk for assistance.",
  },
  {
    question: "How should I prepare for my imaging exam?",
    answer:
      "Preparation depends on the type of exam. Some require fasting, while others need contrast injections. Your doctor will provide specific instructions.",
  },
  {
    question: "When is a CT scan necessary?",
    answer:
      "A CT scan is commonly used for detecting fractures, tumors, lung diseases, and internal bleeding.",
  },
  {
    question: "Are ultrasounds only used for pregnancy?",
    answer:
      "No, ultrasounds are used for various diagnostic purposes, including examining the heart, abdomen, blood vessels, and muscles.",
  },
  {
    question: "When will I receive my results?",
    answer:
      "Results are usually available within 24-48 hours. Urgent cases can be prioritized.",
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
    description:
      "X-rays help detect fractures, infections, and lung diseases by capturing images of dense structures inside the body.",
    procedure:
      "A small amount of radiation is passed through the body to create an image.",
    preparation:
      "Minimal preparation is required. Remove metal objects before the scan.",
  },
  {
    icon: faBrain,
    title: "MRI Scan",
    description:
      "MRI uses magnetic fields and radio waves to create detailed images of soft tissues, ideal for brain and joint diagnostics.",
    procedure:
      "The patient lies in a scanner while magnetic fields generate images.",
    preparation: "Remove metal objects. Inform the technician of any implants.",
  },
  {
    icon: faLungs,
    title: "CT Scan",
    description:
      "CT scans provide cross-sectional images of bones, blood vessels, and organs.",
    procedure:
      "The patient lies on a moving table that passes through an X-ray scanner.",
    preparation: "Fasting may be required if contrast dye is used.",
  },
  {
    icon: faHeartbeat,
    title: "Ultrasound",
    description:
      "Ultrasound uses sound waves to visualize internal organs and blood flow.",
    procedure:
      "A gel is applied, and a handheld probe captures real-time images.",
    preparation: "Drink water for a full bladder before pelvic exams.",
  },
];

export const linksUser = [
  {
    title: "Dashboard",
    link: "/dashboard",
  },
  {
    title: "Logout",
    link: "",
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
    icon: User,
    role: ["admin"],
  },
  {
    title: "Doctors",
    icon: GiDoctorFace,
    role: ["admin"],
  },
  {
    title: "BookAppointments",
    icon: BookOpen,
    role: ["user", "admin"],
  },
  {
    title: "Appointments",
    icon: Calendar,
    role: ["user", "admin"],
  },
  {
    title: "Notifications",
    icon: Inbox,
    role: ["admin", "doctor"],
  },
  {
    title: "Scan",
    icon: ScanLine,
    role: ["user", "admin"],
  },
  {
    title: "Results Scans",
    icon: Scan,
    role: ["user", "admin"],
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
    premiumActive: "bg-[#2D3139] text-primary",
    active: "bg-[#2D3139] text-white",
    button: "bg-indigo-600 hover:bg-indigo-700 text-white",
    main: "bg-[#F8F9FB] dark:bg-[#121317]",
  },
  blue: {
    sidebar: "bg-[#0F172A] text-white",
    header: "bg-[#0F172A] border-b border-[#1E293B]",
    menuItem: "hover:bg-[#1E293B] text-blue-300 hover:text-white",
    premiumActive: "bg-[#1E293B] text-blue-400 hover:text-blue-400",
    active: "bg-blue-700/30 text-white",
    button: "bg-blue-600 hover:bg-blue-700 text-white",
    main: "bg-gradient-to-br from-[#0F172A] via-[#1E40AF] to-[#0F172A]",
  },
};

export const labs = [
  {
    id: 1,
    title: "Lab 1",
    address: "1234 Main St, New York, NY 10001",
    phone: "(123) 456-7890",
  },
  {
    id: 2,
    title: "Lab 2",
    address: "1234 Main St, New York, NY 10001",
    phone: "(123) 456-7890",
  },
  {
    id: 3,
    title: "Lab 3",
    address: "1234 Main St, New York, NY 10001",
    phone: "(123) 456-7890",
  },
];

export const pricingPlans = [
  {
    title: "Monthly Plan",
    color: "text-yellow-500",
    description: "Best for individuals",
    price: "2,000 DZD",
    features: [
      "AI scan analysis",
      "Upload scans anytime",
      "No need to visit the lab",
      "Book more appointments if you need",
    ],
    duree: "month",
  },
  {
    title: "Yearly Plan",
    color: "text-purple-500",
    description: "Save with an annual subscription",
    price: "16,000 DZD",
    features: [
      "AI scan analysis",
      "Upload scans anytime",
      "No need to visit the lab",
      "Book more appointments if you need",
      "2 Months Free",
    ],
    duree: "year",
  },
  {
    title: "Team Plan",
    color: "text-red-500",
    description: "Share with friends & save",
    price: "27,000 DZD",
    features: [
      "AI scan analysis",
      "Upload scans anytime",
      "No need to visit the lab",
      "Book more appointments if you need",

      "Includes 3 users",
    ],
    duree: "year",
  },
];

export const wilayas = [
  "Adrar",
  "Chlef",
  "Laghouat",
  "Oum El Bouaghi",
  "Batna",
  "Béjaïa",
  "Biskra",
  "Béchar",
  "Blida",
  "Bouira",
  "Tamanrasset",
  "Tébessa",
  "Tlemcen",
  "Tiaret",
  "Tizi Ouzou",
  "Algiers",
  "Djelfa",
  "Jijel",
  "Sétif",
  "Saïda",
  "Skikda",
  "Sidi Bel Abbès",
  "Annaba",
  "Guelma",
  "Constantine",
  "Médéa",
  "Mostaganem",
  "MSila",
  "Mascara",
  "Ouargla",
  "Oran",
  "El Bayadh",
  "Illizi",
  "Bordj Bou Arreridj",
  "Boumerdès",
  "El Tarf",
  "Tindouf",
  "Tissemsilt",
  "El Oued",
  "Khenchela",
  "Souk Ahras",
  "Tipaza",
  "Mila",
  "Aïn Defla",
  "Naâma",
  "Aïn Témouchent",
  "Ghardaïa",
  "Relizane",
  "Timimoun",
  "Bordj Badji Mokhtar",
  "Ouled Djellal",
  "Béni Abbès",
  "In Salah",
  "In Guezzam",
  "Touggourt",
  "Djanet",
  "El M'Ghair",
  "El Menia",
];

export const communes = [
  {
    wilaya_code: 1,
    wilaya_name: "Adrar",
    communes: ["Adrar", "Reggane", "Timimoun", "Aoulef"],
  },
  {
    wilaya_code: 2,
    wilaya_name: "Chlef",
    communes: ["Chlef", "Ténès", "Oued Fodda", "El Karimia"],
  },
  {
    wilaya_code: 3,
    wilaya_name: "Laghouat",
    communes: ["Laghouat", "Aflou", "Ksar El Hirane", "Brida"],
  },
  {
    wilaya_code: 4,
    wilaya_name: "Oum El Bouaghi",
    communes: ["Oum El Bouaghi", "Aïn Beïda", "Aïn M'Lila", "F'Kirina"],
  },
  {
    wilaya_code: 5,
    wilaya_name: "Batna",
    communes: ["Batna", "Barika", "Merouana", "Tazoult"],
  },
  {
    wilaya_code: 6,
    wilaya_name: "Béjaïa",
    communes: ["Béjaïa", "Amizour", "Akbou", "Sidi Aïch"],
  },
  {
    wilaya_code: 7,
    wilaya_name: "Biskra",
    communes: ["Biskra", "Tolga", "Ourlal", "El Kantara"],
  },
  {
    wilaya_code: 8,
    wilaya_name: "Béchar",
    communes: ["Béchar", "Kenadsa", "Taghit", "Beni Ounif"],
  },
  {
    wilaya_code: 9,
    wilaya_name: "Blida",
    communes: ["Blida", "Boufarik", "El Affroun", "Mouzaïa"],
  },
  {
    wilaya_code: 10,
    wilaya_name: "Bouira",
    communes: ["Bouira", "Sour El Ghozlane", "Lakhdaria", "Haizer"],
  },
  {
    wilaya_code: 11,
    wilaya_name: "Tamanrasset",
    communes: ["Tamanrasset", "Idles", "In Ghar", "Abalessa"],
  },
  {
    wilaya_code: 12,
    wilaya_name: "Tébessa",
    communes: ["Tébessa", "Bir El Ater", "El Kouif", "Negrine"],
  },
  {
    wilaya_code: 13,
    wilaya_name: "Tlemcen",
    communes: ["Tlemcen", "Maghnia", "Ghazaouet", "Remchi"],
  },
  {
    wilaya_code: 14,
    wilaya_name: "Tiaret",
    communes: ["Tiaret", "Frenda", "Mahdia", "Rahouia"],
  },
  {
    wilaya_code: 15,
    wilaya_name: "Tizi Ouzou",
    communes: [
      "Tizi Ouzou",
      "Draa Ben Khedda",
      "Larbaâ Nath Irathen",
      "Azazga",
    ],
  },
  {
    wilaya_code: 16,
    wilaya_name: "Algiers",
    communes: ["Bab El Oued", "Bir Mourad Raïs", "El Harrach", "El Madania"],
  },
  {
    wilaya_code: 17,
    wilaya_name: "Djelfa",
    communes: ["Djelfa", "Aïn Oussera", "Messaâd", "Hassi Bahbah"],
  },
  {
    wilaya_code: 18,
    wilaya_name: "Jijel",
    communes: ["Jijel", "El Milia", "Taher", "Texenna"],
  },
  {
    wilaya_code: 19,
    wilaya_name: "Sétif",
    communes: ["Sétif", "El Eulma", "Aïn Oulmene", "Guellal"],
  },
  {
    wilaya_code: 20,
    wilaya_name: "Saïda",
    communes: ["Saïda", "Aïn El Hadjar", "Youb", "El Hassasna"],
  },
  {
    wilaya_code: 21,
    wilaya_name: "Skikda",
    communes: ["Skikda", "Azzaba", "Collo", "El Harrouch"],
  },
  {
    wilaya_code: 22,
    wilaya_name: "Sidi Bel Abbès",
    communes: ["Sidi Bel Abbès", "Télagh", "Ras El Ma", "Aïn El Berd"],
  },
  {
    wilaya_code: 23,
    wilaya_name: "Annaba",
    communes: ["Annaba", "El Hadjar", "Berrahal", "Seraïdi"],
  },
  {
    wilaya_code: 24,
    wilaya_name: "Guelma",
    communes: ["Guelma", "Oued Zenati", "Bouchegouf", "Héliopolis"],
  },
  {
    wilaya_code: 25,
    wilaya_name: "Constantine",
    communes: ["Constantine", "El Khroub", "Aïn Smara", "Didouche Mourad"],
  },
  {
    wilaya_code: 26,
    wilaya_name: "Médéa",
    communes: ["Médéa", "Berrouaghia", "Ouled Antar", "Chahbounia"],
  },
  {
    wilaya_code: 27,
    wilaya_name: "Mostaganem",
    communes: ["Mostaganem", "Aïn Nouïssy", "Kheir Eddine", "Sidi Lakhdar"],
  },
  {
    wilaya_code: 28,
    wilaya_name: "M'Sila",
    communes: ["M'Sila", "Bousaâda", "Aïn El Hadjel", "Sidi Aïssa"],
  },
  {
    wilaya_code: 29,
    wilaya_name: "Mascara",
    communes: ["Mascara", "Sig", "Tighennif", "El Bordj"],
  },
  {
    wilaya_code: 30,
    wilaya_name: "Ouargla",
    communes: ["Ouargla", "Touggourt", "Temacine", "El Borma"],
  },
  {
    wilaya_code: 31,
    wilaya_name: "Oran",
    communes: ["Oran", "Bir El Djir", "Es Sénia", "Gdyel"],
  },
  {
    wilaya_code: 32,
    wilaya_name: "El Bayadh",
    communes: ["El Bayadh", "Brezina", "Bougtoub", "Rogassa"],
  },
  {
    wilaya_code: 33,
    wilaya_name: "Illizi",
    communes: ["Illizi", "Djanet", "Debdeb", "In Amenas"],
  },
  {
    wilaya_code: 34,
    wilaya_name: "Bordj Bou Arréridj",
    communes: ["Bordj Bou Arréridj", "Ras El Oued", "El M'hir", "Bir Kasdali"],
  },
  {
    wilaya_code: 35,
    wilaya_name: "Boumerdès",
    communes: ["Boumerdès", "Thénia", "Bordj Menaïel", "Naciria"],
  },
  {
    wilaya_code: 36,
    wilaya_name: "El Tarf",
    communes: ["El Tarf", "Bouhadjar", "El Kala", "Ben M'Hidi"],
  },
  {
    wilaya_code: 37,
    wilaya_name: "Tindouf",
    communes: ["Tindouf", "Oum El Assel"],
  },
  {
    wilaya_code: 38,
    wilaya_name: "Tissemsilt",
    communes: [
      "Tissemsilt",
      "Bordj Emir Abdelkader",
      "Lardjem",
      "Theniet El Had",
    ],
  },
  {
    wilaya_code: 39,
    wilaya_name: "El Oued",
    communes: ["El Oued", "Bayadha", "Guemar", "Robbah"],
  },
  {
    wilaya_code: 40,
    wilaya_name: "Khenchela",
    communes: ["Khenchela", "El Hamma", "Aïn Touila", "Chechar"],
  },
  {
    wilaya_code: 41,
    wilaya_name: "Souk Ahras",
    communes: ["Souk Ahras", "Sedrata", "Hanancha", "Taoura"],
  },
  {
    wilaya_code: 42,
    wilaya_name: "Tipaza",
    communes: ["Tipaza", "Fouka", "Hadjout", "Bou Ismaïl"],
  },
  {
    wilaya_code: 43,
    wilaya_name: "Mila",
    communes: ["Mila", "Tassadane Haddada", "Guelbeb", "Ferdjioua"],
  },
  {
    wilaya_code: 44,
    wilaya_name: "Aïn Defla",
    communes: ["Aïn Defla", "El Attaf", "Rouina", "Miliana"],
  },
  {
    wilaya_code: 45,
    wilaya_name: "Naâma",
    communes: ["Naâma", "Mécheria", "Aïn Séfra", "Moghrar"],
  },
  {
    wilaya_code: 46,
    wilaya_name: "Aïn Témouchent",
    communes: ["Aïn Témouchent", "El Malah", "Beni Saf", "El Amria"],
  },
  {
    wilaya_code: 47,
    wilaya_name: "Ghardaïa",
    communes: ["Ghardaïa", "El Guerrara", "Bounoura", "Metlili"],
  },
  {
    wilaya_code: 48,
    wilaya_name: "Relizane",
    communes: ["Relizane", "Ammi Moussa", "Mazouna", "Zemmoura"],
  },
  {
    wilaya_code: 49,
    wilaya_name: "Timimoun",
    communes: ["Timimoun", "Aougrout", "Tinerkouk", "Metarfa"],
  },
  {
    wilaya_code: 50,
    wilaya_name: "Bordj Badji Mokhtar",
    communes: ["Bordj Badji Mokhtar"],
  },
  {
    wilaya_code: 51,
    wilaya_name: "Ouled Djellal",
    communes: ["Ouled Djellal", "Sidi Khaled", "Doucen"],
  },
  {
    wilaya_code: 52,
    wilaya_name: "Béni Abbès",
    communes: ["Béni Abbès", "Igli", "Tamtert"],
  },
  {
    wilaya_code: 53,
    wilaya_name: "In Salah",
    communes: ["In Salah", "Foggaret Ezzoua", "Ain Salah"],
  },
  {
    wilaya_code: 54,
    wilaya_name: "In Guezzam",
    communes: ["In Guezzam"],
  },
  {
    wilaya_code: 55,
    wilaya_name: "Touggourt",
    communes: ["Touggourt", "Nezla", "Taibet", "Temacine"],
  },
  {
    wilaya_code: 56,
    wilaya_name: "Djanet",
    communes: ["Djanet", "Bordj El Haouas"],
  },
  {
    wilaya_code: 57,
    wilaya_name: "El M'Ghair",
    communes: ["El M'Ghair", "Sidi Khelil", "Oum Touyour"],
  },
  {
    wilaya_code: 58,
    wilaya_name: "El Menia",
    communes: ["El Menia", "Hassi Gara", "Mansoura"],
  },
];
