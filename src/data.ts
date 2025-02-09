import { Project, TimelineItem, Certification } from "./types";

export const projects: Project[] = [
  {
    title: "Fziyen.Dev",
    description: "My Portfolio Website",
    link: "https://github.com/samifziyen/FziyenDotDev",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    tags: ["TypeScript", "Redux", "TailwindCSS"],
  },
  {
    title: "Uni-Eventia",
    description: "University Event management platform",
    link: "https://github.com/samifziyen/unieventia",
    image: "https://i.imgur.com/Fs9oqAD.png",
    tags: ["ReactJS", "NodeJS", "MongoDB"],
  },
  {
    title: "Coming soon...",
    description: "AI-powered fraudulent Signature detector",
    link: "https://github.com/samifziyen",
    image:
      "https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=3032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Python", "TensorFlow", "Typescript"],
  },
];

export const timeline: TimelineItem[] = [
  {
    title: "Freelance Web Developer",
    organization:
      "Working with private clients and delivering software solutions",
    period: "Jan 2022 -> Present",
    description: [
      "Designed and developed Full-stack web applications using modern frameworks like ReactJS and NodeJS",
      "Collaborated with private clients to deliver tailored software solutions, meeting their unique business needs",
      "Developed custom APIs and integrated third-party services to streamline workflows and enhance functionality",
      "Provided ongoing support and updates, ensuring high client satisfaction and long-term partnerships",
    ],
    type: "work",
  },
  {
    title: "Full-Stack web developer Intern",
    organization: "FSTM",
    period: "Apr 2024 -> Jul 2024",
    description: [
      "Developed a Full stack, Multi-role and user-friendly event management platform for student event search and participation",
      "Integrated a real-time participation system ensuring accurate tracking of attendees",
      "Implemented a responsive design ensuring accessibility across devices",
      "Built a robust review system enabling feedback collection and service quality improvement",
    ],
    type: "work",
  },
  {
    title: "Bachelor's  in Information Technology",
    organization: "Centria University of Applied Sciences",
    period: "Aug 2024 -> Jun 2025",
    description: "Double Degree mostly focusing on cloud architecture and AI",
    type: "education",
    logo: "https://storage-prtl-co.imgix.net/endor/organisations/866/logos/1725442892_fileuploads_374525_3875892_183-8e58c08d6aaa0a1860f5c9e220d90f5d_centria_c_512x512.png",
  },
  {
    title: "Bachelor's in Computer Science",
    organization: "Mundiapolis University, Engineering School",
    period: "Sep 2021 -> Jul 2024",
    description: "GPA : 16.04 / 20",
    type: "education",
    logo: "https://i.imgur.com/Gry43UQ.png",
  },
];

export const certifications: Certification[] = [
  {
    name: "AWS Cloud Developing",
    issuer: "Amazon Web Services",
    issueDate: "February 2025",
    logo: "https://images.credly.com/size/680x680/images/119182cf-ca68-495a-a415-bff62dfdcc7e/image.png",
    credentialUrl:
      "https://www.credly.com/badges/2d42d87d-6b51-487d-ac1f-84a8aa8e95fd/public_url",
  },
  {
    name: "AWS Cloud Foundations",
    issuer: "Amazon Web Services",
    issueDate: "October 2024",
    logo: "https://images.credly.com/size/680x680/images/73e4a58b-a8ef-41a3-a7db-9183dd269882/image.png",
    credentialUrl:
      "https://www.credly.com/badges/3aaf55a9-a31b-471c-95b9-5412c803892a",
  },
  {
    name: "Javascript algorithms and data structures",
    issuer: "FreeCodeCamp",
    issueDate: "March 2022",
    logo: "https://www.npmjs.com/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9mY2RhNDM4NTI2MDg2MjZmZTQ2ZDdmZDQzMTQ1NzY2ZT9zaXplPTQ5NiZkZWZhdWx0PXJldHJvIn0.l-5iyLZMhxA8NPM6apqba6oCeJ4p8f63d6aVep6utAI",
    credentialUrl:
      "https://www.freecodecamp.org/certification/Sami-Fziyen/javascript-algorithms-and-data-structures",
  },
  {
    name: "Responsive Web Design",
    issuer: "FreeCodeCamp",
    issueDate: "Janurary 2022",
    logo: "https://www.npmjs.com/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9mY2RhNDM4NTI2MDg2MjZmZTQ2ZDdmZDQzMTQ1NzY2ZT9zaXplPTQ5NiZkZWZhdWx0PXJldHJvIn0.l-5iyLZMhxA8NPM6apqba6oCeJ4p8f63d6aVep6utAI",
    credentialUrl:
      "https://www.freecodecamp.org/certification/Sami-Fziyen/responsive-web-design",
  },
];
