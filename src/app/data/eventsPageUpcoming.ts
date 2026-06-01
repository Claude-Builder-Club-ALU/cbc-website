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
  id: "hackathon" | "workshop" | "fluency";
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

/** Single calendar marker: 15 May 2026 workshop only (reference). */
export const EVENTS_PAGE_CALENDAR_EVENTS: CalEvent[] = [
  {
    id: 2,
    date: "2026-05-15",
    title: "Building with Agents -- Workshop 2",
    time: "14:30 - 16:00",
    location: "Algeria classroom, ALU Kigali campus",
    description:
      "Building with Agents -- Workshop 2. Venue: Algeria classroom, ALU Kigali campus. Open to all skill levels.",
  },
];

/** Maps numeric CalEvent id from the events page calendar to detail card id. */
export function cardIdFromCalEvent(ev: CalEvent): "hackathon" | "workshop" | "fluency" | null {
  if (ev.id === 2) return "workshop";
  return null;
}

export const EVENTS_PAGE_CARDS: EventsPageCard[] = [
  {
    id: "hackathon",
    filterKeys: ["all", "hackathon"],
    badgeLabel: "Hackathon",
    badgeVariant: "hackathon",
    featuredPill: "Season finale",
    title: "End of Program Hackathon: AI for Social Impact",
    datePrimary: "May 29, 2026",
    dateSecondary: "09:00 - 17:00",
    description:
      "Solo or in team of two to three will build and present AI-powered solutions using the Claude API across five thematic tracks, all grounded in the Social Impact theme.",
    metaRows: [
      {
        icon: "users",
        text:
          "Open to all members. Participants must have attended at least one CBC meeting to receive API credits before the event.",
      },
      {
        icon: "clock",
        text:
          "Duration: 4 days build with 1 day demo and prize awarding day",
      },
      {
        icon: "award",
        text:
          "Prizes: up to USD 1,500 in Claude API credits, Cash prizes, merch and Finals nomination for the ALU Club & Societies Hackathon.",
      },
      {
        icon: "screen",
        text: "Venue: Kenya-Burundi, Enterprise commons",
      },
    ],
    highlightTags: [
      "social impact",
      "Cash prizes",
      "external judges",
      "API credits",
      "Devpost submissions",
    ],
    footerNote: "Registration is ongoing",
    buttonLabel: "Register now",
    buttonVariant: "primary",
    buttonHref: "#upcoming",
  },
  {
    id: "workshop",
    filterKeys: ["all", "workshops"],
    badgeLabel: "Workshop",
    badgeVariant: "workshop",
    title: "Building with Agents -- Workshop 2",
    datePrimary: "Thursday, 15 May 2026",
    dateSecondary: "Time to be confirmed -- check Slack for updates",
    description:
      'This workshop marks the transition from "using AI" to "deploying AI." Participants will explore how AI agents perceive inputs, reason about them, and take autonomous action across multi-step tasks with minimal human intervention. The session covers agent design principles, tool use, and how MCP provides agents with access to real-world data and external systems.',
    metaRows: [
      {
        icon: "screen",
        text: "Venue: Algeria classroom, ALU Kigali campus",
      },
      {
        icon: "users",
        text: "Open to all skill levels. Recommended for students planning to participate in the hackathon.",
      },
      {
        icon: "clock",
        text:
          "Prerequisite: familiarity with the Model Context Protocol is helpful but not required. Attend the MCP workshop recording if you missed it.",
      },
    ],
    highlightTags: [
      "agent design",
      "tool use",
      "ethical AI deployment",
      "hands-on activity",
    ],
    footerNote: "CBC members -- attendance tracked at check-in",
    buttonLabel: "Add to calendar",
    buttonVariant: "outline",
    calendarSourceId: 2,
  },
  {
    id: "fluency",
    filterKeys: ["all", "club-meetings"],
    badgeLabel: "Date pending",
    badgeVariant: "date-pending",
    title: "AI Fluency and Ethical Use of AI -- Official Course",
    datePrimary: "Date to be determined",
    dateSecondary: "Schedule is set by ALU's Student Success body",
    dateMuted: true,
    description:
      "The ALU Claude Builder Club has been officially mandated by the university to deliver this course on campus, making it a formal part of ALU's academic infrastructure. Grounded in Anthropic's AI Fluency Framework, the course teaches every student -- regardless of major or technical background -- how to collaborate with AI systems effectively, efficiently, ethically, and safely.",
    metaRows: [
      {
        icon: "diagram",
        text:
          "Curriculum is structured around the 4D Framework: Delegation, Description, Discernment, and Diligence -- a model developed by Anthropic in partnership with leading universities.",
      },
      {
        icon: "users",
        text:
          "Designed for all students -- no coding background required. Particularly valuable for students in business, social sciences, and humanities who wish to engage responsibly with AI in their fields.",
      },
      {
        icon: "clock",
        text:
          "Self-paced preparation is available: the free Anthropic Academy AI Fluency course is accessible at anthropic.skilljar.com and awards a shareable certificate upon completion.",
      },
    ],
    highlightTags: [
      "university-mandated",
      "4D Framework",
      "all majors welcome",
      "certificate available",
    ],
    footerNote: "Scheduling coordinated by Student Success office",
    buttonLabel: "Watch for announcements",
    buttonVariant: "muted",
  },
];

export function getWorkshopHomeEventForIcs(
  upcoming: HomeUpcomingEvent[],
): HomeUpcomingEvent | undefined {
  return upcoming.find((e) => e.id === 2);
}
