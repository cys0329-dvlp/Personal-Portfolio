import { Link, useLocation, useOutlet } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import React from "react";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/study", label: "Study" },
  { path: "/contact", label: "Contact" },
];

export default function Layout() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-zinc-200 flex flex-col">
      <header className="sticky top-0 z-50 bg-zinc-50/80 backdrop-blur-md border-b border-zinc-200/50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="font-medium tracking-tight hover:opacity-70 transition-opacity">
            Archive.
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative transition-colors ${
                  location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path))
                    ? "text-zinc-900"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {link.label}
                {(location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path))) && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 -bottom-1 h-px bg-zinc-900"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12 md:py-24">
        <AnimatePresence mode="wait">
          {outlet && React.cloneElement(outlet as React.ReactElement, { key: location.pathname })}
        </AnimatePresence>
      </main>

      <footer className="border-t border-zinc-200/50 py-8 mt-auto">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Personal Archive.</p>
          <p>Building, Experimenting, Learning.</p>
        </div>
      </footer>
    </div>
  );
}
