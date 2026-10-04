"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  UserRound,
  LogOut,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Vehicle",
    href: "/vehicle",
    icon: Car,
  },
  {
    name: "Driver",
    href: "/driver",
    icon: UserRound,
  },
];

export default function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static
          inset-y-0 left-0
          z-50
          w-64
          bg-slate-900
          text-white
          flex flex-col
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-700">
          
          <div>
            <h1 className="text-lg font-bold">
              Fleet Management
            </h1>

            <p className="text-xs text-slate-400">
              Vehicle Verification
            </p>
          </div>

          {/* Mobile Close */}
          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-lg hover:bg-slate-800"
          >
            <X size={20} />
          </button>

        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">

          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center gap-3
                  px-4 py-3
                  rounded-lg
                  text-sm
                  transition
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }
                `}
              >
                <Icon size={20} />

                <span>{item.name}</span>
              </Link>
            );
          })}

        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-700">

          <button
            className="
              w-full
              flex items-center gap-3
              px-4 py-3
              rounded-lg
              text-sm
              text-slate-300
              hover:bg-slate-800
              hover:text-white
            "
          >
            <LogOut size={20} />

            <span>Logout</span>
          </button>

        </div>

      </aside>
    </>
  );
}