import type { LucideIcon } from "lucide-react";
import { Calendar, MapPin, User } from "lucide-react";
import type { CalEvent } from "../components/EventCalendar";

export type EventRowIcon = "calendar" | "map" | "user";

export interface HomeUpcomingEvent {
  id: number;
  dateLabel: string;
  title: string;
  rows: { icon: EventRowIcon; text: string }[];
  chip?: string;
  featured: boolean;
  seasonFinale?: boolean;
  action: "checkBack" | "calendar";
  ics?: {
    date: string;
    start: string;
    end: string;
    location: string;
  };
}

// Workshops from the Claude Builder Club programme (Claude Ambassador hub).
// Dates are not set yet: when one is confirmed, set dateLabel, switch action to
// "calendar" and add `ics` so it appears on the calendar.
export const UPCOMING_EVENTS: HomeUpcomingEvent[] = [
  {
    id: 1,
    dateLabel: "Date to be announced",
    title: "Workshop: Claude Code + Skills",
    rows: [
      { icon: "calendar", text: "Set up Claude Code live and build your first project" },
    ],
    featured: false,
    action: "checkBack",
  },
  {
    id: 2,
    dateLabel: "Date to be announced",
    title: "Workshop: Building with MCP",
    rows: [
      { icon: "calendar", text: "See MCP in action, then build your own MCP server" },
    ],
    featured: false,
    action: "checkBack",
  },
  {
    id: 3,
    dateLabel: "Date to be announced",
    title: "Workshop: Building Agents",
    rows: [
      { icon: "calendar", text: "Learn what an agent is, when to build one, and build one" },
    ],
    featured: false,
    action: "checkBack",
  },
  {
    id: 4,
    dateLabel: "Date to be announced",
    title: "AI Research Salon",
    rows: [
      { icon: "calendar", text: "Live discussion of current AI research, including alignment and interpretability" },
    ],
    featured: false,
    action: "checkBack",
  },
];

export function getEventRowIcon(icon: EventRowIcon): LucideIcon {
  switch (icon) {
    case "calendar":
      return Calendar;
    case "map":
      return MapPin;
    default:
      return User;
  }
}

export function addToCalendarDownload(event: HomeUpcomingEvent): void {
  if (!event.ics) return;
  const eventDate = new Date(`${event.ics.date}T${event.ics.start}`);
  const endDate = new Date(`${event.ics.date}T${event.ics.end}`);

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${eventDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTEND:${endDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
SUMMARY:${event.title}
LOCATION:${event.ics.location}
DESCRIPTION:Claude Builder Club Event at ALU
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${event.title.replace(/[^a-z0-9]/gi, "_")}.ics`;
  link.click();
  URL.revokeObjectURL(url);
}

/** Events with a fixed date for the month grid (excludes TBD-only items). */
export function toCalEvents(events: HomeUpcomingEvent[]): CalEvent[] {
  return events
    .filter((e): e is HomeUpcomingEvent & { ics: NonNullable<HomeUpcomingEvent["ics"]> } => Boolean(e.ics))
    .map((e) => ({
      id: e.id,
      date: e.ics.date,
      title: e.title,
      time: `${e.ics.start} - ${e.ics.end}`,
      location: e.ics.location,
      description: `${e.title}. ${e.rows.map((r) => r.text).join(" ")}`,
    }));
}
