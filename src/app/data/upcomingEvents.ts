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

export const UPCOMING_EVENTS: HomeUpcomingEvent[] = [
  {
    id: 1,
    dateLabel: "Date to be announced",
    title: "AI Fluency and Ethical Use of AI Workshop",
    rows: [
      { icon: "calendar", text: "Scheduled by Student Success office" },
      { icon: "user", text: "ALU Kigali Campus" },
    ],
    chip: "Official date TBD",
    featured: false,
    action: "checkBack",
  },
  {
    id: 2,
    dateLabel: "May 15, 2026",
    title: "Workshop: Building with AI Agents",
    rows: [
      { icon: "calendar", text: "02:30 - 04:00" },
      { icon: "map", text: "Algeria Classroom, Social commons" },
    ],
    featured: false,
    action: "calendar",
    ics: {
      date: "2026-05-15",
      start: "14:30",
      end: "16:00",
      location: "Algeria Classroom, Social commons, ALU",
    },
  },
  {
    id: 3,
    dateLabel: "May 29, 2026",
    title: "Hackathon: AI for Social Impact",
    rows: [
      { icon: "calendar", text: "09:00 - 17:00" },
      { icon: "map", text: "Kenya-Burundi Hall, Enterprise commons" },
    ],
    featured: true,
    seasonFinale: true,
    action: "calendar",
    ics: {
      date: "2026-05-29",
      start: "09:00",
      end: "21:00",
      location: "Kenya-Burundi Hall, Enterprise commons, ALU",
    },
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
