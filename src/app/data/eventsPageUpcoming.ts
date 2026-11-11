import type { CalEvent } from "../components/EventCalendar";
import type { HomeUpcomingEvent } from "./upcomingEvents";

/** Filter chip values for the Events page upcoming section. */
export type EventsPageFilter =
  | "all"
  | "workshops"
  | "club-meetings"
  | "hackathon"
  | "tabling";

export type EventsPageMetaIcon =
  | "users"
  | "clock"
  | "award"
  | "screen"
  | "book"
  | "diagram";

export interface EventsPageCard {
  id: string;
  filterKeys: EventsPageFilter[];
  badgeLabel: string;
  badgeVariant: "hackathon" | "workshop" | "date-pending";
  featuredPill?: string;
  title: string;
  datePrimary: string;
  dateSecondary: string;
  dateMuted?: boolean;
  description: string;
  metaRows: { icon: EventsPageMetaIcon; text: string }[];
  highlightTags: string[];
  footerNote: string;
  buttonLabel: string;
  buttonVariant: "primary" | "outline" | "muted";
  buttonHref?: string;
  /** When set, "Add to calendar" uses this home event for ICS download. */
  calendarSourceId?: number;
}

/**
 * Calendar markers. Empty until workshop dates are confirmed; add an entry here
 * (and to CALENDAR_CARD_IDS) for each dated event.
 */
export const EVENTS_PAGE_CALENDAR_EVENTS: CalEvent[] = [];

/** Maps a calendar event id to the id of its detail card. */
const CALENDAR_CARD_IDS: Record<number, string> = {};

export function cardIdFromCalEvent(ev: CalEvent): string | null {
  return CALENDAR_CARD_IDS[ev.id] ?? null;
}

const DATE_TBA = {
  datePrimary: "Date to be announced",
  dateSecondary: "Check back here or on our socials for the date and venue",
  dateMuted: true,
  footerNote: "Led by CBC ambassadors during a club meeting",
  buttonLabel: "Watch for announcements",
  buttonVariant: "muted",
} as const;

// Workshops from the Claude Builder Club programme (Claude Ambassador hub).
export const EVENTS_PAGE_CARDS: EventsPageCard[] = [
  {
    id: "claude-code",
    filterKeys: ["all", "workshops"],
    badgeLabel: "Workshop",
    badgeVariant: "workshop",
    title: "Claude Code + Skills",
    description:
      "Set up Claude Code in real time and see some of its most powerful use cases, then use it to create your very first project.",
    metaRows: [
      { icon: "screen", text: "Hands-on: bring a laptop to follow along" },
      { icon: "users", text: "Open to all skill levels" },
    ],
    highlightTags: ["Claude Code", "Skills", "first project", "hands-on"],
    ...DATE_TBA,
  },
  {
    id: "mcp",
    filterKeys: ["all", "workshops"],
    badgeLabel: "Workshop",
    badgeVariant: "workshop",
    title: "Building with MCP",
    description:
      "See the Model Context Protocol (MCP) in action, then get started building your own MCP server to connect Claude to real-world data and tools.",
    metaRows: [
      { icon: "screen", text: "Hands-on: bring a laptop to follow along" },
      { icon: "users", text: "Open to all skill levels" },
    ],
    highlightTags: ["MCP", "tool use", "integrations", "hands-on"],
    ...DATE_TBA,
  },
  {
    id: "agents",
    filterKeys: ["all", "workshops"],
    badgeLabel: "Workshop",
    badgeVariant: "workshop",
    title: "Building Agents",
    description:
      "The ins and outs of AI agents: what an agent is, when you should build one, and how to build one. Learn the ideas, then build an agent yourself.",
    metaRows: [
      { icon: "screen", text: "Hands-on: bring a laptop to follow along" },
      { icon: "book", text: "Helpful to attend Building with MCP first" },
    ],
    highlightTags: ["agents", "agent design", "tool use", "hands-on"],
    ...DATE_TBA,
  },
  {
    id: "research-salon",
    filterKeys: ["all", "club-meetings"],
    badgeLabel: "Discussion",
    badgeVariant: "workshop",
    title: "AI Research Salon",
    description:
      "A live, discussion-led session on the hottest topics in AI research, including alignment science and interpretability. Come with questions and opinions.",
    metaRows: [
      { icon: "users", text: "Open to everyone, no technical background needed" },
      { icon: "diagram", text: "Topics include alignment science and interpretability" },
    ],
    highlightTags: ["AI research", "alignment", "interpretability", "discussion"],
    ...DATE_TBA,
  },
];

export function getWorkshopHomeEventForIcs(
  upcoming: HomeUpcomingEvent[],
): HomeUpcomingEvent | undefined {
  return upcoming.find((e) => e.id === 2);
}
