import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  SquareMenu,
  LogIn,
  LogOut,
  UserRoundPlus,
  LayoutDashboard,
} from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import SocialLinks from "../social-links/social-links";
import FilterContents from "../filter-contents/filter-contents";

const Sidebar = () => {
  // getting isAuthenticated from auth slice
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [open, setOpen] = useState(false);

  // toggle
  function toggleNavbar() {
    setOpen(!open);
  }

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 md:shrink-0">
        <div className="h-4" />
        <aside className="flex h-full flex-col gap-3 p-4">
          <div className="flex items-center justify-between px-2 pb-2 solid-border-b">
            <div className="flex items-center gap-2">
              <span className="h-9 w-9">
                <img
                  className="h-full w-full rounded-lg"
                  src="/logo/logo.jpg"
                  alt="logo"
                />
              </span>
              <span className="text-lg font-semibold">SnapLink</span>
            </div>
          </div>
          <nav className="flex-1 space-y-1">
            {isAuthenticated ? (
              <>
              <div className="solid-border-b flex-1 space-y-1 pb-1">
                <Link
                  to="/signout"
                  className="hover-color text-sm flex items-center gap-3 w-full px-3 py-2 rounded-xl cursor-pointer"
                >
                  <LogOut strokeWidth={1} className="h-5 w-5" />
                  <span className="text-sm font-medium">Sign out</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="hover-color text-sm flex items-center gap-3 w-full px-3 py-2 rounded-xl cursor-pointer"
                >
                  <LayoutDashboard strokeWidth={1} className="h-5 w-5" />
                  <span className="text-sm font-medium">Dashboard</span>
                </Link>
                </div>
                <FilterContents />
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="hover-color text-sm flex items-center gap-3 w-full px-3 py-2 rounded-xl cursor-pointer"
                >
                  <UserRoundPlus strokeWidth={1} className="h-5 w-5" />
                  <span className="text-sm font-medium">Sign up</span>
                </Link>
                <Link
                  to="/signin"
                  className="hover-color text-sm flex items-center gap-3 w-full px-3 py-2 rounded-xl cursor-pointer"
                >
                  <LogIn strokeWidth={1} className="h-5 w-5" />
                  <span className="text-sm font-medium">Sign in</span>
                </Link>
              </>
            )}
          </nav>
          <div className="mt-auto solid-border-b">
            <div className="text-xs px-2">v1.0.0</div>
          </div>

          {/* social links */}
          <SocialLinks />
        </aside>
      </div>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <aside className="color-base-300 color-base-content absolute left-0 top-0 bottom-0 z-50 w-72 p-4 flex flex-col">
            <div className="flex items-center justify-between px-2 pb-2 solid-border-b">
              <div className="flex items-center gap-2">
                <span className="h-9 w-9">
                  <img
                    className="h-full w-full rounded-lg"
                    src="/logo/logo.jpg"
                    alt="logo"
                  />
                </span>
                <span className="text-lg font-semibold">SnapLink</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-xl hover-color cursor-pointer"
                aria-label="Close menu"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>
            <nav className="space-y-1 p-1 solid-border-b">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/signout"
                    className="hover-color text-sm flex items-center gap-3 w-full px-3 py-2 rounded-xl cursor-pointer"
                  >
                    <LogOut strokeWidth={1} className="h-5 w-5" />
                    <span className="text-sm font-medium">Sign out</span>
                  </Link>
                  <FilterContents />
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="hover-color text-sm flex items-center gap-3 w-full px-3 py-2 rounded-xl cursor-pointer"
                  >
                    <UserRoundPlus strokeWidth={1} className="h-5 w-5" />
                    <span className="text-sm font-medium">Sign up</span>
                  </Link>
                  <Link
                    to="/signin"
                    className="hover-color text-sm flex items-center gap-3 w-full px-3 py-2 rounded-xl cursor-pointer"
                  >
                    <LogIn strokeWidth={1} className="h-5 w-5" />
                    <span className="text-sm font-medium">Sign in</span>
                  </Link>
                </>
              )}
            </nav>
            {/* social links */}
            <SocialLinks />
          </aside>
        </div>
      ) : (
        <span
          className="inline md:hidden absolute top-0 right-0"
          onClick={toggleNavbar}
        >
          <SquareMenu
            strokeWidth={1}
            className="color-base-content w-7 sm:w-8 md:w-9 h-auto mt-1 mr-1 sm:mt-2 sm:mr-2 cursor-pointer"
          />
        </span>
      )}
    </>
  );
};

export default function Navbar() {
  return (
    <section id="navbar" className="color-base-300 color-base-content">
      <Sidebar />
    </section>
  );
}
