"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

export function NavMain({
  title,
  items,
}: {
  title: string;
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  const path = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem
              key={item.title}
              onClick={() =>
                !(
                  item.url.includes("/dashboard") ||
                  item.url.includes("/categories") ||
                  item.url.includes("/users")
                ) && toast.info("Still Under Development")
              }
            >
              <Link
                href={
                  !(
                    item.url.includes("/dashboard") ||
                    item.url.includes("/categories") ||
                    item.url.includes("/users")
                  )
                    ? "#"
                    : item.url
                }
                className="w-full flex items-center
              "
              >
                <SidebarMenuButton
                  isActive={path.includes(item.url.toLowerCase())}
                  tooltip={item.title}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
