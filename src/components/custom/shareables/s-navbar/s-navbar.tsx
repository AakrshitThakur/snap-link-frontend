import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, SquareMenu, ExternalLink, Earth } from "lucide-react";
import ShareableFilterContents from "../s-filter-contents/s-filter-contents";

const baseFrontendUrl = import.meta.env.VITE_BASE_FRONTEND_URL;

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  // toggle
  function toggleNavbar() {
    setOpen(!open);
  }

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:h-screen md:flex md:flex-col md:w-64">
        <aside className="flex h-full flex-col justify-start gap-3 p-5">
          {/* logo */}
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
          {/* Navigation links */}
          <nav className="flex-1 space-y-1">
            <div className="solid-border-b flex-1 space-y-1 text-sm pb-1">
              <Link
                to={baseFrontendUrl}
                className="hover-color flex items-center gap-3 w-full px-3 py-2 rounded-xl cursor-pointer"
                target="__blank"
              >
                <Earth strokeWidth={1} className="h-5 w-5" />
                <span className="font-medium">Visit Website</span>
                <ExternalLink strokeWidth={1} className="h-5 w-5" />
              </Link>
            </div>
            <ShareableFilterContents />
          </nav>
          <div className="solid-border-b">
            <div className="text-xs px-2">v1.0.0</div>
          </div>
        </aside>
      </div>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <aside className="color-base-300 color-base-content absolute left-0 top-0 bottom-0 z-50 w-72 flex flex-col gap-3 p-3">
            {/* logo */}
            <div className="flex items-center justify-between px-2 pb-2 solid-border-b">
              <Link to={baseFrontendUrl} className="flex items-center gap-2">
                <span className="h-9 w-9">
                  <img
                    className="h-full w-full rounded-lg"
                    src="/logo/logo.jpg"
                    alt="logo"
                  />
                </span>
                <span className="text-lg font-semibold">SnapLink</span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-xl hover-color cursor-pointer"
                aria-label="Close menu"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>
            {/* Navigation links */}
            <nav>
              <div className="space-y-1">
                <div className="solid-border-b flex-1 space-y-1 pb-1">
                  <Link
                    to={baseFrontendUrl}
                    className="hover-color text-sm flex items-center gap-3 w-full px-3 py-2 rounded-xl cursor-pointer"
                    target="__blank"
                  >
                    <Earth strokeWidth={1} className="h-5 w-5" />
                    <span className="text-sm font-medium">Visit Website</span>
                    <ExternalLink strokeWidth={1} className="h-5 w-5" />
                  </Link>
                </div>
                <ShareableFilterContents />
              </div>
            </nav>
          </aside>
        </div>
      ) : (
        <span
          className="inline md:hidden absolute top-0 right-0 z-50"
          onClick={toggleNavbar}
        >
          <SquareMenu
            strokeWidth={1.25}
            className="color-base-content w-7 sm:w-8 md:w-9 h-auto mt-1 mr-1 sm:mt-2 sm:mr-2 cursor-pointer"
          />
        </span>
      )}
    </>
  );
};

export default function ShareableNavbar() {
  return (
    <section
      id="shareable-navbar"
      className="color-base-300 color-base-content md:overflow-y-scroll md:overflow-x-hidden"
    >
      <Sidebar />
    </section>
  );
}
