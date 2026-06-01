import { useEffect, useState } from "react";
import { MapPin, Users, ImageIcon, Github, Video, FileText } from "lucide-react";
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

const pastEvents = [
  {
    id: 1,
    date: "2026-02-15",
    title: "Introduction to Claude: Getting Started Workshop",
    location: "Tech Lab",
    attendees: 52,
    resources: {
      slides: "#",
      photo:
        "https://images.unsplash.com/photo-1561089489-f13d5e730d72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2xhc3Nyb29tJTIwd29ya3Nob3AlMjB0ZWNobm9sb2d5JTIwbGVhcm5pbmd8ZW58MXx8fHwxNzczODY2NzU2fDA&ixlib=rb-4.1.0&q=80&w=400",
      github: "#",
    },
  },
  {
    id: 2,
    date: "2026-02-01",
    title: "Winter Hackathon 2026",
    location: "Main Campus",
    attendees: 95,
    resources: {
      photo:
        "https://images.unsplash.com/photo-1560651921-19590b2b7ad7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWNrYXRob24lMjB0ZWFtJTIwY29kaW5nJTIwdG9nZXRoZXIlMjBuaWdodHxlbnwxfHx8fDE3NzM4NjY3NTZ8MA&ixlib=rb-4.1.0&q=80&w=400",
      github: "#",
      recording: "#",
    },
  },
  {
    id: 3,
    date: "2026-01-20",
    title: "AI Ethics Panel Discussion",
    location: "Auditorium B",
    attendees: 110,
    resources: {
      slides: "#",
      photo:
        "https://images.unsplash.com/photo-1758270705317-3ef6142d306f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwc3R1ZGVudCUyMGdyb3VwJTIwcHJvamVjdCUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzczODY2NzU2fDA&ixlib=rb-4.1.0&q=80&w=400",
      recording: "#",
    },
  },
  {
    id: 4,
    date: "2025-12-10",
    title: "End of Year Project Showcase",
    location: "Innovation Hub",
    attendees: 75,
    resources: {
      slides: "#",
      photo:
        "https://images.unsplash.com/photo-1770364292936-1800aa621b3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2x1YiUyMHRlYW0lMjBwaG90byUyMGRpdmVyc2UlMjBzdHVkZW50c3xlbnwxfHx8fDE3NzM4NjY3NTJ8MA&ixlib=rb-4.1.0&q=80&w=400",
      github: "#",
    },
  },
  {
    id: 5,
    date: "2025-11-18",
    title: "Build with Claude: Chatbot Workshop",
    location: "Tech Lab",
    attendees: 48,
    resources: { slides: "#", github: "#", recording: "#" },
  },
  {
    id: 6,
    date: "2025-10-25",
    title: "Welcome Week Mixer",
    location: "Student Lounge",
    attendees: 85,
    resources: {
      photo:
        "https://images.unsplash.com/photo-1646579885920-0c9a01cb7078?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGFpJTIwd29ya3Nob3AlMjBsYXB0b3AlMjBwcmVzZW50YXRpb258ZW58MXx8fHwxNzczODY2NzUyfDA&ixlib=rb-4.1.0&q=80&w=400",
    },
  },
];

export function Events() {
  const [filter, setFilter] = useState<EventsPageFilter>("all");
  const [calendarFocusedId, setCalendarFocusedId] = useState<
    "hackathon" | "workshop" | "fluency" | null
  >(null);

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
            Spring 2026 Programme
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
          Stay engaged with what is coming up this semester. Only the May workshop appears on the
          calendar until further dates are confirmed.
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
                {event.resources.photo && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.resources.photo}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="text-[#D97757] text-sm font-semibold mb-2">
                    {new Date(event.date + "T00:00:00").toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#D97757] transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <MapPin size={14} />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Users size={14} />
                    <span>{event.attendees} attended</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {event.resources.slides && (
                      <a
                        href={event.resources.slides}
                        className="flex items-center gap-1 text-xs bg-secondary text-foreground px-3 py-1.5 rounded-lg hover:bg-[#D97757] hover:text-[#0D0D0D] transition-all"
                      >
                        <FileText size={14} />
                        Slides
                      </a>
                    )}
                    {event.resources.photo && (
                      <a
                        href={event.resources.photo}
                        className="flex items-center gap-1 text-xs bg-secondary text-foreground px-3 py-1.5 rounded-lg hover:bg-[#D97757] hover:text-[#0D0D0D] transition-all"
                      >
                        <ImageIcon size={14} />
                        Photos
                      </a>
                    )}
                    {event.resources.github && (
                      <a
                        href={event.resources.github}
                        className="flex items-center gap-1 text-xs bg-secondary text-foreground px-3 py-1.5 rounded-lg hover:bg-[#D97757] hover:text-[#0D0D0D] transition-all"
                      >
                        <Github size={14} />
                        Demo
                      </a>
                    )}
                    {event.resources.recording && (
                      <a
                        href={event.resources.recording}
                        className="flex items-center gap-1 text-xs bg-secondary text-foreground px-3 py-1.5 rounded-lg hover:bg-[#D97757] hover:text-[#0D0D0D] transition-all"
                      >
                        <Video size={14} />
                        Recording
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
