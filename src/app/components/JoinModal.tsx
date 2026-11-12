import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { ArrowUpRight, ClipboardList, MessageCircle, type LucideIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

/** Official CBC sign-up form (needed for member perks). */
export const SIGNUP_URL = "https://www.jotform.com/253555944387168";
/** CBC WhatsApp community invite link. */
export const WHATSAPP_COMMUNITY_URL = "https://chat.whatsapp.com/If3lsEYAb0NG5x1JHJdgfu";

type JoinOption = {
  Icon: LucideIcon;
  title: string;
  text: string;
  href: string;
  badge?: string;
};

const OPTIONS: JoinOption[] = [
  {
    Icon: ClipboardList,
    title: "Official club sign-up",
    text: "Register as a CBC member to get Claude Pro, API credits and hackathon access.",
    href: SIGNUP_URL,
    badge: "Start here",
  },
  {
    Icon: MessageCircle,
    title: "WhatsApp community",
    text: "Get event announcements, workshop reminders and chat with other builders.",
    href: WHATSAPP_COMMUNITY_URL,
  },
];

const JoinModalContext = createContext<() => void>(() => {});

/** Returns a function that opens the "Join the Club" modal. */
export const useJoinModal = () => useContext(JoinModalContext);

export function JoinModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), []);
  const value = useMemo(() => openModal, [openModal]);

  return (
    <JoinModalContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg rounded-2xl p-6 sm:p-8 bg-card">
          <DialogHeader className="text-left">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Join the club</p>
            <DialogTitle className="text-2xl font-bold tracking-tight">Two steps to get started</DialogTitle>
            <DialogDescription className="text-base">
              Sign up to become an official member, then join the community so you never miss an event.
            </DialogDescription>
          </DialogHeader>

          <ol className="mt-2 grid gap-3">
            {OPTIONS.map(({ Icon, title, text, href, badge }, i) => {
              const content = (
                <>
                  <span className="relative w-11 h-11 shrink-0 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                    <Icon size={22} aria-hidden />
                    <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-foreground">{title}</span>
                      {badge && href && (
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 ring-1 ring-primary/30 rounded-full px-2 py-0.5">
                          {badge}
                        </span>
                      )}
                      {!href && (
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground bg-secondary rounded-full px-2 py-0.5">
                          Link coming soon
                        </span>
                      )}
                    </span>
                    <span className="block text-sm text-muted-foreground leading-snug mt-1">{text}</span>
                  </span>
                  {href && (
                    <ArrowUpRight
                      size={18}
                      aria-hidden
                      className="shrink-0 text-muted-foreground group-hover:text-primary transition-colors"
                    />
                  )}
                </>
              );
              const base = "group flex items-start gap-4 rounded-xl p-4 ring-1 transition-colors";
              return (
                <li key={title}>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className={`${base} ring-border hover:ring-primary hover:bg-primary/5`}
                    >
                      {content}
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : (
                    <div aria-disabled className={`${base} ring-border/60 opacity-60`}>
                      {content}
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </DialogContent>
      </Dialog>
    </JoinModalContext.Provider>
  );
}
