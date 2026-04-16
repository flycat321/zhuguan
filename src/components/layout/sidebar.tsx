"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FolderKanban,
  ClipboardList,
  Users,
  BarChart3,
  FileText,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  section: string;
  adminOnly?: boolean;
}

const navItems: NavItem[] = [
  {
    label: "进度看板",
    href: "/dashboard",
    icon: LayoutDashboard,
    section: "overview",
  },
  {
    label: "项目管理",
    href: "/projects",
    icon: FolderKanban,
    section: "overview",
  },
  {
    label: "工作记录",
    href: "/worklog",
    icon: ClipboardList,
    section: "workspace",
  },
  {
    label: "人员看板",
    href: "/admin/workload",
    icon: BarChart3,
    section: "admin",
    adminOnly: true,
  },
  {
    label: "周报汇总",
    href: "/admin/weekly",
    icon: FileText,
    section: "admin",
    adminOnly: true,
  },
  {
    label: "用户管理",
    href: "/admin/users",
    icon: Users,
    section: "admin",
    adminOnly: true,
  },
];

const sectionLabels: Record<string, string> = {
  overview: "OVERVIEW",
  workspace: "WORKSPACE",
  admin: "ADMIN",
};

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAdmin = session?.user?.role === "ADMIN";

  const filteredItems = navItems.filter(
    (item) => !item.adminOnly || isAdmin
  );

  // 按 section 分组
  const sections = filteredItems.reduce<Record<string, NavItem[]>>(
    (acc, item) => {
      if (!acc[item.section]) acc[item.section] = [];
      acc[item.section].push(item);
      return acc;
    },
    {}
  );

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-lg shadow-primary">
          筑
        </div>
        <div>
          <div className="text-xl font-bold text-gradient-primary">筑管</div>
          <div className="text-[11px] text-muted-foreground">
            Project Manager
          </div>
        </div>
      </div>

      {/* 导航 */}
      <nav className="flex-1 space-y-1">
        {Object.entries(sections).map(([section, items]) => (
          <div key={section}>
            <div className="text-[11px] font-semibold uppercase tracking-[1.5px] text-muted-foreground px-3.5 pt-6 pb-2.5">
              {sectionLabels[section]}
            </div>
            {items.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" &&
                  pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 mb-1",
                    isActive
                      ? "bg-accent text-accent-foreground font-semibold"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground hover:translate-x-1"
                  )}
                >
                  <item.icon className="w-[18px] h-[18px]" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* 用户卡片 */}
      {session?.user && (
        <div className="mt-auto rounded-2xl bg-gradient-to-br from-primary/5 to-chart-4/5 p-3.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white text-[15px] font-semibold shadow-primary/30 shadow-md">
              {session.user.name?.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">
                {session.user.name}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {session.user.role === "ADMIN" ? "管理员" : "成员"}
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
              title="退出登录"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* 桌面侧边栏 */}
      <aside className="hidden md:flex w-[260px] flex-col fixed h-screen bg-card border-r border-border p-5 pt-8 z-10">
        {sidebarContent}
      </aside>

      {/* 移动端汉堡按钮 */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden rounded-xl shadow-soft bg-card"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* 移动端侧边栏遮罩 */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* 移动端侧边栏 */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 w-[260px] flex flex-col bg-card border-r border-border p-5 pt-8 z-40 md:hidden transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
