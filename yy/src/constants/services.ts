import { Globe, Smartphone, Server, Palette, Search } from 'lucide-react';

export const SERVICES = [
  {
    id: "01",
    title: "Web Design & Redesign",
    desc: "Sites that hold beauty and function in perfect tension — custom builds, full redesigns, CMS-ready and impossible to ignore.",
    bullets: ["Custom design from scratch", "Full site redesign & refresh", "Responsive across all devices", "CMS integration & handoff"],
    icon: Globe,
    color: "rgba(249, 115, 22, 0.8)",
    bg: "rgba(249, 115, 22, 0.03)"
  },
  {
    id: "02",
    title: "Application Design",
    desc: "Interfaces that feel inevitable — iOS, Android, and web apps designed through deep UX research and deliberate visual thinking.",
    bullets: ["iOS & Android UI design", "UX research & wireframing", "Interactive prototyping", "Design system creation"],
    icon: Smartphone,
    color: "rgba(239, 68, 68, 0.8)",
    bg: "rgba(239, 68, 68, 0.03)"
  },
  {
    id: "03",
    title: "SEO & Keyword Optimisation",
    desc: "Visibility that converts — data-driven search strategies and technical SEO that place your brand exactly where it needs to be.",
    bullets: ["Technical SEO audits", "Keyword research & strategy", "On-page & content optimisation", "Performance tracking & reporting"],
    icon: Search,
    color: "rgba(16, 185, 129, 0.8)",
    bg: "rgba(16, 185, 129, 0.03)"
  },
  {
    id: "04",
    title: "Branding & Identity",
    desc: "Brand worlds, not just logos — complete identity systems that hold contradiction and command attention at every touchpoint.",
    bullets: ["Logo & visual identity", "Brand strategy & positioning", "Typography & colour systems", "Brand guidelines & assets"],
    icon: Palette,
    color: "rgba(244, 63, 94, 0.8)",
    bg: "rgba(244, 63, 94, 0.03)"
  }
];
