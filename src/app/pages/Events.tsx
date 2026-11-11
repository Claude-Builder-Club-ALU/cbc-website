import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ImageIcon } from "lucide-react";
import { EventCalendar, type CalEvent } from "../components/EventCalendar";
import { EventsPageUpcomingCard } from "../components/EventsPageUpcomingCard";
import {
  EVENTS_PAGE_CALENDAR_EVENTS,
  EVENTS_PAGE_CARDS,
  cardIdFromCalEvent,
  getWorkshopHomeEventForIcs,
  type EventsPageFilter,
} from "../data/eventsPageUpcoming";
import { UPCOMING_EVENTS } from "../data/upcomingEvents";

const workshopIcsSource = getWorkshopHomeEventForIcs(UPCOMING_EVENTS);

const FILTER_CHIPS: { key: EventsPageFilter; label: string }[] = [
  { key: "all", label: "All events" },
  { key: "workshops", label: "Workshops" },
  { key: "club-meetings", label: "Club meetings" },
  { key: "hackathon", label: "Hackathon" },
  { key: "tabling", label: "Tabling" },
];

// Real CBC events, matching the photo sets on the Gallery page (newest first).
// `date` is YYYY-MM-DD, or YYYY-MM when only the month is known.
type PastEvent = {
  id: number;
  date: string;
  title: string;
  category: string;
  photo: string;
};

const pastEvents: PastEvent[] = [
  {
    id: 1,
    date: "2026-03-24",
    title: "Club Tabling",
    category: "Tabling",
    photo: "/tabling-3/IMG_5295.jpg",
  },
  {
    id: 2,
    date: "2026-03-20",
    title: "Intro to MCP",
    category: "Workshop",
    photo: "/cbc-meeting-3/IMG_1688.jpg",
  },
  {
    id: 3,
    date: "2026-03",
    title: "Claude Code Workshop: Intro to Claude Code",
    category: "Workshop",
    photo: "/cbc-meeting-2/1ee16cd9-a55b-4dba-8e90-94fd14e311d0.jpg",
  },
  {
    id: 4,
    date: "2026-02-20",
    title: "CBC Kickoff: AI Fluency Session",
    category: "Club meeting",
    photo: "/cbc-meeting-1/IMG_0328.jpg",
  },
  {
    id: 5,
    date: "2026-02-10",
    title: "Club Tabling",
    category: "Tabling",
    photo: "/tabling-1/IMG_7694.jpg",
  },
];

function formatPastEventDate(date: string) {
  const hasDay = date.length === 10;
  return new Date(`${hasDay ? date : `${date}-01`}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    ...(hasDay ? { day: "numeric" } : {}),
    year: "numeric",
  });
}

export function Events() {
  const [filter, setFilter] = useState<EventsPageFilter>("all");
  const [calendarFocusedId, setCalendarFocusedId] = useState<string | null>(null);

  const visibleCards =
    filter === "all"
      ? EVENTS_PAGE_CARDS
      : filter === "tabling"
        ? []
        : EVENTS_PAGE_CARDS.filter((c) => c.filterKeys.includes(filter));

  useEffect(() => {
    if (!calendarFocusedId) return;
    const el = document.getElementById(`event-card-${calendarFocusedId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [calendarFocusedId]);

  const handleCalendarDay = (ev: CalEvent) => {
    const id = cardIdFromCalEvent(ev);
    if (id) setCalendarFocusedId(id);
  };

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-[#D97757]/10 to-transparent py-16 sm:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#D97757] mb-2">
            Claude Builder Club Programme
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">Events</h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            All workshops, club meetings, tabling sessions, and the end-of-semester hackathon for the
            ALU Claude Builder Club community.
          </p>

          <div
            className="flex flex-wrap gap-2 mt-8"
            role="group"
            aria-label="Filter upcoming events"
          >
            {FILTER_CHIPS.map(({ key, label }) => {
              const active = filter === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  className={[
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                    active
                      ? "bg-[#D97757] text-[#0D0D0D] border-[#D97757] shadow-sm"
                      : "bg-card text-muted-foreground border-border hover:border-[#D97757]/50 hover:text-foreground",
                  ].join(" ")}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="upcoming" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Upcoming
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Upcoming events</h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mb-10 sm:mb-12">
          The workshops coming up this semester. Each one is added to the calendar as soon as its
          date is confirmed.
        </p>

        <div className="grid grid-cols-1 xl:grid-cols-[minmax(280px,380px)_1fr] gap-10 xl:gap-12 items-start">
          <div className="xl:sticky xl:top-24 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Month view
            </h3>
            <EventCalendar
              events={EVENTS_PAGE_CALENDAR_EVENTS}
              onEventDayClick={handleCalendarDay}
            />
          </div>

          <div className="space-y-6 min-w-0">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Details
            </h3>
            {visibleCards.length === 0 ? (
              <p className="text-sm text-muted-foreground rounded-2xl border border-dashed border-border p-8">
                No events match this filter in the upcoming list. Choose another filter or All
                events to see the full programme.
              </p>
            ) : (
              <div className="flex flex-col gap-6">
                {visibleCards.map((card) => (
                  <EventsPageUpcomingCard
                    key={card.id}
                    card={card}
                    highlighted={calendarFocusedId === card.id}
                    workshopIcsSource={card.id === "workshop" ? workshopIcsSource : undefined}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">Past Events</h2>
            <p className="text-muted-foreground max-w-2xl mb-4">
              Highlights from recent CBC gatherings and collaborations.
            </p>
            <div className="h-1 w-24 bg-[#D97757] rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="bg-background border border-border rounded-2xl overflow-hidden hover:border-[#D97757] transition-all group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.photo}
                    alt={`${event.title}, ${formatPastEventDate(event.date)}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-[#D97757] text-sm font-semibold">
                      {formatPastEventDate(event.date)}
                    </span>
                    <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
                      {event.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-[#D97757] transition-colors">
                    {event.title}
                  </h3>

                  <Link
                    to="/gallery"
                    className="inline-flex items-center gap-1 min-h-10 text-xs bg-secondary text-foreground px-3 py-1.5 rounded-lg hover:bg-[#D97757] hover:text-[#0D0D0D] transition-all"
                  >
                    <ImageIcon size={14} />
                    Photos
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
