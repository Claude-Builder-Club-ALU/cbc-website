import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Projects", path: "/projects" },
    { name: "Gallery", path: "/gallery" },
    { name: "Team", path: "/team" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0D0D0D]/95 backdrop-blur-sm border-b border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex items-center gap-2">
              {/* ALU Logo (placeholder) */}
              <div className="w-10 h-10 rounded-lg bg-[#D97757] flex items-center justify-center">
                <span className="font-bold text-[#0D0D0D]">ALU</span>
              </div>
              <span className="text-[#9CA3AF]">×</span>
              {/* Claude Logo (placeholder) */}
              <div className="w-10 h-10 rounded-lg bg-[#D97757] flex items-center justify-center">
                <span className="font-bold text-[#0D0D0D]">C</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold group-hover:text-[#D97757] transition-colors">CBC</div>
              <div className="text-xs text-[#9CA3AF]">Claude Builder Club</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors ${
                  isActive(link.path)
                    ? "text-[#D97757]"
                    : "text-[#F5F5F5] hover:text-[#D97757]"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/projects"
              className="bg-[#D97757] text-[#0D0D0D] px-6 py-2.5 rounded-xl hover:bg-[#E08967] transition-all hover:shadow-lg hover:shadow-[#D97757]/20"
            >
              Join the Club
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#F5F5F5] hover:text-[#D97757] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#2A2A2A] bg-[#0D0D0D]">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 transition-colors ${
                  isActive(link.path)
                    ? "text-[#D97757]"
                    : "text-[#F5F5F5] hover:text-[#D97757]"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center bg-[#D97757] text-[#0D0D0D] px-6 py-2.5 rounded-xl hover:bg-[#E08967] transition-all"
            >
              Join the Club
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
