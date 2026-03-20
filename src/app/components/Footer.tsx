import { Link } from "react-router";
import { Instagram, Linkedin, Twitter, Github, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#D97757] flex items-center justify-center">
                <span className="font-bold text-[#0D0D0D]">ALU</span>
              </div>
              <span className="text-muted-foreground">×</span>
              <div className="w-10 h-10 rounded-lg bg-[#D97757] flex items-center justify-center">
                <span className="font-bold text-[#0D0D0D]">C</span>
              </div>
            </div>
            <p className="text-muted-foreground max-w-sm mb-4">
              Building the future with AI at African Leadership University. Join us to explore, create, and innovate with Claude.
            </p>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail size={16} />
              <a href="mailto:cbc@alustudent.com" className="hover:text-[#D97757] transition-colors">
                cbc@alustudent.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-[#D97757] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-muted-foreground hover:text-[#D97757] transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-muted-foreground hover:text-[#D97757] transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-muted-foreground hover:text-[#D97757] transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-muted-foreground hover:text-[#D97757] transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-[#D97757] transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/cbc_alu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-card flex items-center justify-center text-muted-foreground hover:text-[#D97757] hover:bg-secondary transition-all border border-border"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com/company/cbc-alu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-card flex items-center justify-center text-muted-foreground hover:text-[#D97757] hover:bg-secondary transition-all border border-border"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://twitter.com/cbc_alu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-card flex items-center justify-center text-muted-foreground hover:text-[#D97757] hover:bg-secondary transition-all border border-border"
                aria-label="X (Twitter)"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://github.com/cbc-alu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-card flex items-center justify-center text-muted-foreground hover:text-[#D97757] hover:bg-secondary transition-all border border-border"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 Claude Builder Club at ALU. All rights reserved.</p>
          <p>Built with Claude • Designed for African Excellence</p>
        </div>
      </div>
    </footer>
  );
}
