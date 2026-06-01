import { Link } from "react-router";
import { ArrowRight, Star } from "lucide-react";
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
    <section className="py-20 sm:py-24 bg-[#0D0D0D] text-[#F5F5F5] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-12 lg:mb-14">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">Upcoming Events</h2>
            <p className="text-zinc-400 text-base sm:text-lg max-w-xl">
              Stay engaged with what is coming up this semester
            </p>
          </div>
          {showViewAllLink && (
            <Link
              to="/events"
              className="inline-flex items-center gap-1.5 text-[#D97757] font-medium hover:text-[#E08967] transition-colors shrink-0"
            >
              View All
              <ArrowRight size={18} className="text-[#D97757]" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className={`relative rounded-2xl p-6 sm:p-7 flex flex-col h-full bg-[#1A1A1A] border transition-colors ${
                event.featured
                  ? "border-2 border-[#D97757] shadow-[0_0_0_1px_rgba(217,119,87,0.15)]"
                  : "border border-white/10 hover:border-white/20"
              } ${event.seasonFinale ? "pt-9 sm:pt-10" : ""}`}
            >
              {event.seasonFinale && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center gap-1.5 bg-[#D97757] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                    <Star size={12} className="text-amber-200 fill-amber-200 shrink-0" aria-hidden />
                    Season Finale
                  </span>
                </div>
              )}

              <p className="text-[#D97757] font-semibold text-sm sm:text-base mb-3 mt-1">{event.dateLabel}</p>
              <h3 className="text-lg sm:text-xl font-bold text-white leading-snug mb-4">{event.title}</h3>
              <div className="border-t border-white/10 mb-4" />
              <div className="space-y-3 text-zinc-400 text-sm flex-1 mb-5">
                {event.rows.map((row, i) => {
                  const Icon = getEventRowIcon(row.icon);
                  return (
                    <div key={i} className="flex items-start gap-2.5">
                      <Icon size={16} className="shrink-0 mt-0.5 text-zinc-500" aria-hidden />
                      <span className="leading-snug">{row.text}</span>
                    </div>
                  );
                })}
              </div>

              {event.chip && (
                <div className="mb-5">
                  <span className="inline-block text-xs font-medium text-zinc-400 bg-zinc-800/80 border border-white/10 rounded-full px-3 py-1">
                    {event.chip}
                  </span>
                </div>
              )}

              {event.action === "checkBack" ? (
                <button
                  type="button"
                  className="w-full mt-auto py-3 rounded-xl font-semibold text-white border border-white/80 bg-transparent hover:bg-white/10 transition-colors"
                >
                  Check Back Soon
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => addToCalendarDownload(event)}
                  className="w-full mt-auto py-3 rounded-xl font-semibold text-white border border-white/80 bg-transparent hover:bg-white/10 transition-colors"
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
