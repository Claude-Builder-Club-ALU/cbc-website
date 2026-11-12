import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ImageIcon, Presentation } from "lucide-react";
import { EventCalendar, type CalEvent } from "../components/EventCalendar";
import { EventsPageUpcomingCard } from "../components/EventsPageUpcomingCard";
import { HackathonSpotlight } from "../components/HackathonSpotlight";
import { Pagination, usePaged, useRowsPageSize } from "../components/Pagination";
import {
  EVENTS_PAGE_CALENDAR_EVENTS,
  EVENTS_PAGE_CARDS,
  cardIdFromCalEvent,
  getWorkshopHomeEventForIcs,
  type EventsPageFilter,
} from "../data/eventsPageUpcoming";
import { UPCOMING_EVENTS } from "../data/upcomingEvents";
import { photoSrcSet, smallPhoto } from "../utils/responsiveImage";

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
  /** Shown instead of the formatted date when the exact date is not known. */
  dateLabel?: string;
  /** Link to the gallery filtered to this event's photos. */
  photosLink?: string;
  slidesUrl?: string;
};

const pastEvents: PastEvent[] = [
  {
    id: 7,
    date: "2026-10-29",
    title: "Info Session: Fall 2026",
    category: "Club meeting",
    photo: "/events/info-session-2.webp",
  },
  {
    id: 6,
    date: "2026-05-29",
    title: "Spring 2026 Hackathon",
    category: "Hackathon",
    photo: "/events/hackathon-spring-2026-5.webp",
    photosLink: "/gallery?filter=hackathon",
  },
  {
    id: 8,
    date: "2026-04",
    dateLabel: "Spring 2026",
    title: "Building Agents Workshop",
    category: "Workshop",
    photo: "/events/agents-workshop.webp",
    slidesUrl: "https://docs.google.com/presentation/d/19WsdznfwZZp5rr2KTFNnk0jIiocy-v42y3Ra4lWFKAs/view",
  },
  {
    id: 2,
    date: "2026-03-20",
    title: "Building with MCP",
    category: "Workshop",
    photo: "/events/mcp-workshop.webp",
  },
  {
    id: 3,
    date: "2026-03",
    title: "Claude Code & Skills Workshop",
    category: "Workshop",
    photo: "/events/claude-code-2.webp",
  },
  {
    id: 4,
    date: "2026-02-20",
    title: "CBC Kickoff: AI Fluency Session",
    category: "Club meeting",
    photo: "/cbc-meeting-1/IMG_0328.webp",
  },
  {
    id: 5,
    date: "2026-02-10",
    title: "Club Tabling",
    category: "Tabling",
    photo: "/tabling-1/IMG_7694.webp",
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
  // Past events: at most two rows of cards per page.
  const pastRef = useRef<HTMLElement>(null);
  const pastPageSize = useRowsPageSize({ base: 1, md: 2, lg: 3 });
  const past = usePaged(pastEvents, pastPageSize);
  const [filter, setFilter] = useState<EventsPageFilter>("all");
  const [calendarFocusedId, setCalendarFocusedId] = useState<string | null>(null);

  const visibleCards =
    filter === "all"
      ? EVENTS_PAGE_CARDS
      : filter === "tabling"
        ? []
        : EVENTS_PAGE_CARDS.filter((c) => c.filterKeys.includes(filter));
  const showHackathon = filter === "all" || filter === "hackathon";

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
      <section className="bg-gradient-to-b from-primary/10 to-transparent py-16 sm:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary mb-2">
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
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground",
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
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Upcoming Events</h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mb-10 sm:mb-12">
          The end-of-program hackathon and the workshops leading up to it. Each one is added to the calendar as soon as its
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
            {showHackathon && <HackathonSpotlight />}
            {visibleCards.length === 0 && !showHackathon ? (
              <p className="text-sm text-muted-foreground rounded-2xl border border-dashed border-border p-8">
                No events match this filter in the upcoming list. Choose another filter or All
                events to see the full programme.
              </p>
            ) : visibleCards.length === 0 ? null : (
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

      <section ref={pastRef} className="py-20 bg-card/50 border-y border-border scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Past Events</h2>
            <p className="text-muted-foreground max-w-2xl mb-4">
              Highlights from recent CBC gatherings and collaborations.
            </p>
            <div className="h-1 w-24 bg-primary rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {past.pageItems.map((event) => (
              <div
                key={event.id}
                className="bg-background border border-border rounded-2xl overflow-hidden hover:border-primary transition-all group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={smallPhoto(event.photo)}
                    srcSet={photoSrcSet(event.photo)}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    alt={`${event.title}, ${event.dateLabel ?? formatPastEventDate(event.date)}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-primary text-sm font-semibold">
                      {event.dateLabel ?? formatPastEventDate(event.date)}
                    </span>
                    <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
                      {event.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>

                  {(event.photosLink || event.slidesUrl) && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {event.photosLink && (
                        <Link
                          to={event.photosLink}
                          className="inline-flex items-center gap-1.5 min-h-10 text-xs font-medium bg-secondary text-foreground px-3 py-1.5 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all"
                        >
                          <ImageIcon size={14} aria-hidden />
                          Photos
                        </Link>
                      )}
                      {event.slidesUrl && (
                        <a
                          href={event.slidesUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 min-h-10 text-xs font-medium bg-secondary text-foreground px-3 py-1.5 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all"
                        >
                          <Presentation size={14} aria-hidden />
                          Slides
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Pagination
            label="Past events pages"
            page={past.page}
            pageCount={past.pageCount}
            onChange={past.setPage}
            scrollTargetRef={pastRef}
          />
        </div>
      </section>
    </div>
  );
}
