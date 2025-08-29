import { useEffect, useState } from "react";
import { ChevronLeft, SquareMenu, LogIn, UserRoundPlus } from "lucide-react";
import SocialLinks from "../social-links/social-links";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  function toggleNavbar() {
    setOpen(!open);
  }

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  // })
  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 md:shrink-0">
        <div className="h-4" />
        <aside className="flex h-full flex-col gap-3 p-4">
          <div className="flex items-center justify-between px-2">
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
                <a
                  href="/signout"
                  className="hover-color text-sm flex items-center gap-3 w-full px-3 py-2 rounded-xl cursor-pointer"
                >
                  <UserRoundPlus strokeWidth={1} className="h-5 w-5" />
                  <span className="text-sm font-medium">Sign out</span>
                </a>
              </>
            ) : (
              <>
                <a
                  href="/signup"
                  className="hover-color text-sm flex items-center gap-3 w-full px-3 py-2 rounded-xl cursor-pointer"
                >
                  <UserRoundPlus strokeWidth={1} className="h-5 w-5" />
                  <span className="text-sm font-medium">Sign up</span>
                </a>
                <a
                  href="/signin"
                  className="hover-color text-sm flex items-center gap-3 w-full px-3 py-2 rounded-xl cursor-pointer"
                >
                  <LogIn strokeWidth={1} className="h-5 w-5" />
                  <span className="text-sm font-medium">Sign in</span>
                </a>
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
            <div className="flex items-center justify-between px-2 pb-2 border-b">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-2xl bg-gray-900" />
                <span className="text-lg font-semibold">Acme</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-xl hover:bg-gray-100"
                aria-label="Close menu"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 mt-3">
              <button className="flex items-center gap-3 w-full px-3 py-2 rounded-xl transition-colors">
                <LogIn className="h-5 w-5" />
                <span className="text-sm font-medium">Sign up</span>
              </button>
              <button className="flex items-center gap-3 w-full px-3 py-2 rounded-xl transition-colors">
                {/* <Icon className="h-5 w-5" /> */}
                <span className="text-sm font-medium">Sign up</span>
              </button>
              <button className="flex items-center gap-3 w-full px-3 py-2 rounded-xl transition-colors">
                {/* <Icon className="h-5 w-5" /> */}
                <span className="text-sm font-medium">Sign up</span>
              </button>
              <button className="flex items-center gap-3 w-full px-3 py-2 rounded-xl transition-colors">
                {/* <Icon className="h-5 w-5" /> */}
                <span className="text-sm font-medium">Sign up</span>
              </button>
            </nav>
          </aside>
        </div>
      ) : (
        <span
          className="inline md:hidden absolute top-0 right-0"
          onClick={toggleNavbar}
        >
          <SquareMenu
            strokeWidth={1}
            className="color-base-content w-7 sm:w-8 md:w-9 h-auto mt-1 mr-1 sm:mt-2 sm:mr-2"
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
