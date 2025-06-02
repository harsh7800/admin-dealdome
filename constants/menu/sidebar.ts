import {
  CameraIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
  ShieldIcon,
  StarIcon,
  TagIcon,
  ImageIcon,
  CreditCardIcon,
} from "lucide-react";

export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  // Main Navigation - Core Features
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Users",
      url: "/users",
      icon: UsersIcon,
    },
    {
      title: "Categories",
      url: "/categories",
      icon: TagIcon,
    },
    {
      title: "Banners",
      url: "/banners",
      icon: ImageIcon,
    },
  ],
  // Content Management Section
  navContent: [
    {
      title: "Brand",
      icon: CameraIcon,
      isActive: true,
      url: "/brand",
    },
    {
      title: "Plans",
      icon: CreditCardIcon,
      url: "/plans",
    },
    {
      title: "Rating",
      icon: StarIcon,
      url: "/rating",
    },
  ],
  // System Administration
  navAdmin: [
    {
      title: "Roles",
      url: "/roles",
      icon: ShieldIcon,
    },
    {
      title: "Security",
      url: "/security",
      icon: ShieldIcon,
    },
  ],
  // Secondary Navigation - Utilities
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: SettingsIcon,
    },
    {
      title: "Search",
      url: "/search",
      icon: SearchIcon,
    },
    {
      title: "Help",
      url: "/help",
      icon: HelpCircleIcon,
    },
  ],
};
