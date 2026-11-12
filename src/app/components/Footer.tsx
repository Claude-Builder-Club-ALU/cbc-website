import { Link } from "react-router";
import { Instagram, Linkedin, Github, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logos/cbc-logo_coloured.png"
                alt="Claude Builder Club at African Leadership University"
                className="h-11 lg:h-12 w-auto max-w-[min(100%,260px)] object-contain object-left drop-shadow-[0_2px_6px_rgba(0,0,0,0.1)] dark:hidden"
              />
              <img
                src="/logos/cbc-logo.png"
                alt="Claude Builder Club at African Leadership University"
                className="hidden h-11 lg:h-12 w-auto max-w-[min(100%,260px)] object-contain object-left dark:block drop-shadow-[0_0_22px_rgba(255,255,255,0.09)]"
              />
            </div>
            <p className="text-muted-foreground max-w-sm mb-6">
              Building the future with AI at African Leadership University. Join us to explore, create, and innovate with Claude.
            </p>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail size={16} />
              <a href="mailto:cbcalu.rw@gmail.com" className="inline-flex items-center min-h-10 hover:text-primary transition-colors">
                cbcalu.rw@gmail.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="grid grid-cols-3 gap-x-6">
              <li>
                <Link to="/" className="inline-flex items-center min-h-10 text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/#team" className="inline-flex items-center min-h-10 text-muted-foreground hover:text-primary transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/events" className="inline-flex items-center min-h-10 text-muted-foreground hover:text-primary transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/projects" className="inline-flex items-center min-h-10 text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="inline-flex items-center min-h-10 text-muted-foreground hover:text-primary transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/faq" className="inline-flex items-center min-h-10 text-muted-foreground hover:text-primary transition-colors">
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
                className="w-10 h-10 rounded-lg bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary transition-all border border-border"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/claude-builder-club-alu/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary transition-all border border-border"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/Claude-Builder-Club-ALU"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary transition-all border border-border"
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
          <p>Built with Claude</p>
        </div>
      </div>
    </footer>
  );
}
