"use client";

import {
  Menu,
  Bell,
  UserCircle,
} from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({
  onMenuClick,
}: HeaderProps) {
  return (
    <header
      className="
        h-16
        bg-white
        border-b border-slate-200
        flex items-center justify-between
        px-4 md:px-6
        shrink-0
      "
    >

      {/* Left */}
      <div className="flex items-center gap-3">

        {/* Mobile Menu */}
        <button
          onClick={onMenuClick}
          className="
            md:hidden
            p-2
            rounded-lg
            hover:bg-slate-100
          "
        >
          <Menu size={22} />
        </button>

        <div>
          <h2 className="text-base md:text-lg font-semibold text-slate-800">
            Fleet Management
          </h2>

          <p className="hidden sm:block text-xs text-slate-500">
            Vehicle & Driver Verification
          </p>
        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        {/* Notification */}
        <button
          className="
            relative
            p-2
            rounded-lg
            hover:bg-slate-100
          "
        >
          <Bell size={20} className="text-slate-600" />

          <span
            className="
              absolute
              top-1
              right-1
              w-2
              h-2
              bg-red-500
              rounded-full
            "
          />
        </button>

        {/* User */}
        <div className="flex items-center gap-2">

          <UserCircle
            size={34}
            className="text-slate-500"
          />

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-slate-800">
              Administrator
            </p>

            <p className="text-xs text-slate-500">
              Admin
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}