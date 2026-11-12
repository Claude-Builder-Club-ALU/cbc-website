import { Link } from "react-router";
import { ArrowRight, Clock, Star } from "lucide-react";
import {
  UPCOMING_EVENTS,
  addToCalendarDownload,
  getEventRowIcon,
  type HomeUpcomingEvent,
} from "../data/upcomingEvents";

interface UpcomingEventsBlockProps {
  showViewAllLink?: boolean;
  events?: HomeUpcomingEvent[];
}

export function UpcomingEventsBlock({
  showViewAllLink = true,
  events = UPCOMING_EVENTS,
}: UpcomingEventsBlockProps) {
  return (
    <section className="py-20 sm:py-24 bg-background text-foreground border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-12 lg:mb-14">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-2">Upcoming Events</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-xl">
              Stay engaged with what is coming up this semester
            </p>
          </div>
          {showViewAllLink && (
            <Link
              to="/events"
              className="inline-flex items-center gap-1.5 min-h-10 text-primary font-medium hover:text-primary/80 transition-colors shrink-0"
            >
              View All
              <ArrowRight size={18} className="text-primary" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className={`relative rounded-2xl p-6 sm:p-7 flex flex-col h-full bg-card border transition-colors ${
                event.featured
                  ? "border-2 border-primary shadow-[0_0_0_1px_rgba(217,119,87,0.15)]"
                  : "border border-border hover:border-primary/50"
              } ${event.seasonFinale ? "pt-9 sm:pt-10" : ""}`}
            >
              {event.seasonFinale && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                    <Star size={12} className="fill-current shrink-0" aria-hidden />
                    Season Finale
                  </span>
                </div>
              )}

              <p className="text-primary font-semibold text-sm sm:text-base mb-3 mt-1">{event.dateLabel}</p>
              <h3 className="text-lg sm:text-xl font-bold text-foreground leading-snug mb-4">{event.title}</h3>
              <div className="border-t border-border mb-4" />
              <div className="space-y-3 text-muted-foreground text-sm flex-1 mb-5">
                {event.rows.map((row, i) => {
                  const Icon = getEventRowIcon(row.icon);
                  return (
                    <div key={i} className="flex items-start gap-2.5">
                      <Icon size={16} className="shrink-0 mt-0.5 text-muted-foreground" aria-hidden />
                      <span className="leading-snug">{row.text}</span>
                    </div>
                  );
                })}
              </div>

              {event.chip && (
                <div className="mb-5">
                  <span className="inline-block text-xs font-medium text-muted-foreground bg-secondary border border-border rounded-full px-3 py-1">
                    {event.chip}
                  </span>
                </div>
              )}

              {event.action === "checkBack" ? (
                // Status, not an action: the date has not been announced yet.
                <p className="w-full mt-auto py-3 rounded-xl text-sm font-medium text-muted-foreground border border-dashed border-border flex items-center justify-center gap-2">
                  <Clock size={15} aria-hidden className="text-primary" />
                  Watch for announcements
                </p>
              ) : (
                <button
                  type="button"
                  onClick={() => addToCalendarDownload(event)}
                  className="w-full mt-auto py-3 rounded-xl font-semibold text-foreground border border-foreground/70 bg-transparent hover:bg-foreground/10 transition-colors"
                >
                  Add to Calendar
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
