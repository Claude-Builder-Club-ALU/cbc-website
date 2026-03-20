import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, X, MapPin, Clock, ExternalLink } from "lucide-react";

export interface CalEvent {
  id: number;
  date: string;   // YYYY-MM-DD
  title: string;
  time: string;   // "HH:MM - HH:MM"
  location: string;
  description: string;
}

interface EventCalendarProps {
  events: CalEvent[];
  /**
   * Your public Google Calendar ID.
   * How to get it:
   *  1. Go to calendar.google.com and create a calendar for CBC events.
   *  2. Open Settings > [your calendar] > "Access permissions for events"
   *     and tick "Make available to public".
   *  3. Scroll to "Integrate calendar" and copy the Calendar ID
   *     (looks like abc123@group.calendar.google.com).
   *  4. Paste it here.
   *
   * When a visitor clicks "Add CBC Calendar" they'll see Google Calendar's
   * "Add to My Calendars" dialog — exactly the shared-calendar subscribe flow.
   */
  calendarId?: string;
}

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

/** Builds a Google Calendar "add event" pre-fill URL for a single event. */
function buildGCalEventLink(ev: CalEvent) {
  const [startH, endH] = ev.time.split(" - ");
  const d = ev.date.replace(/-/g, "");
  const start = `${d}T${startH.replace(":", "")}00`;
  const end   = `${d}T${endH.replace(":", "")}00`;
  return (
    `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${encodeURIComponent(ev.title)}` +
    `&dates=${start}/${end}` +
    `&details=${encodeURIComponent(ev.description)}` +
    `&location=${encodeURIComponent(ev.location)}`
  );
}

export function EventCalendar({ events, calendarId }: EventCalendarProps) {
  const today = new Date();
  const [viewYear, setViewYear]   = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected, setSelected]   = useState<CalEvent | null>(null);

  // ── Build calendar grid ────────────────────────────────────────────────────
  const daysInMonth    = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstWeekday   = new Date(viewYear, viewMonth, 1).getDay();
  const prevMonthDays  = new Date(viewYear, viewMonth, 0).getDate();

  type CellType = "prev" | "current" | "next";
  const cells: { day: number; type: CellType }[] = [];

  for (let i = firstWeekday - 1; i >= 0; i--)
    cells.push({ day: prevMonthDays - i, type: "prev" });
  for (let d = 1; d <= daysInMonth; d++)
    cells.push({ day: d, type: "current" });
  let nxt = 1;
  while (cells.length % 7 !== 0 || cells.length < 35)
    cells.push({ day: nxt++, type: "next" });

  // Event lookup map
  const eventMap: Record<string, CalEvent> = {};
  events.forEach(e => { eventMap[e.date] = e; });

  const getEvent = (day: number, type: CellType) => {
    if (type !== "current") return null;
    const key = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return eventMap[key] ?? null;
  };

  const isToday = (day: number, type: CellType) =>
    type === "current" &&
    day === today.getDate() &&
    viewMonth === today.getMonth() &&
    viewYear === today.getFullYear();

  // ── Navigation ─────────────────────────────────────────────────────────────
  const goBack = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const goForward = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };
  const goToday = () => {
    setViewMonth(today.getMonth());
    setViewYear(today.getFullYear());
  };

  // ── Subscribe URL ──────────────────────────────────────────────────────────
  const subscribeUrl = calendarId
    ? `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(calendarId)}`
    : null;

  return (
    <>
      <div className="bg-card border border-border rounded-2xl p-5 lg:p-6 w-full">
        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold tracking-tight">
            {MONTHS[viewMonth]}
            <span className="text-muted-foreground text-xl font-normal ml-2">{viewYear}</span>
          </h2>
          <div className="flex items-center gap-1">
            <button
              onClick={goBack}
              className="p-2 rounded-full hover:bg-[#D97757]/20 transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={goToday}
              className="px-3 py-1.5 text-sm rounded-full hover:bg-[#D97757]/20 transition-colors font-medium"
            >
              Today
            </button>
            <button
              onClick={goForward}
              className="p-2 rounded-full hover:bg-[#D97757]/20 transition-colors"
              aria-label="Next month"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* ── Day-of-week headers ── */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {DAYS.map(d => (
            <div key={d} className="h-7 flex items-center pl-1.5">
              <span className="text-xs text-muted-foreground font-medium">{d}</span>
            </div>
          ))}
        </div>

        {/* ── Calendar grid ── */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((cell, i) => {
            const ev  = getEvent(cell.day, cell.type);
            const tod = isToday(cell.day, cell.type);
            return (
              <div
                key={i}
                role={ev ? "button" : undefined}
                tabIndex={ev ? 0 : undefined}
                onClick={() => ev && setSelected(ev)}
                onKeyDown={e => e.key === "Enter" && ev && setSelected(ev)}
                className={[
                  "h-16 sm:h-20 rounded-lg transition-all duration-200 flex flex-col items-start justify-start relative p-1.5",
                  ev
                    ? "cursor-pointer bg-[#D97757]/60 hover:bg-[#D97757]/80"
                    : "hover:bg-[#D97757]/10",
                  tod && !ev ? "ring-2 ring-[#D97757] bg-[#D97757]/10" : "",
                  cell.type === "current" ? "text-foreground" : "text-muted-foreground/40",
                ].join(" ")}
              >
                <span className={`text-xs font-semibold leading-none ${ev ? "text-white" : ""}`}>
                  {cell.day}
                </span>
                {ev && (
                  <div className="absolute inset-x-1 bottom-1.5 flex items-end justify-center">
                    <p className="text-white text-[9px] font-medium text-center leading-tight line-clamp-2">
                      {ev.title}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Subscribe button ── */}
        <div className="flex justify-end mt-4">
          <button
            onClick={() => {
              if (subscribeUrl) {
                window.open(subscribeUrl, "_blank");
              } else {
                alert("Calendar subscription coming soon! Ask a CBC officer for the link.");
              }
            }}
            className="flex items-center gap-2 bg-[#D97757] text-[#0D0D0D] px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#E08967] transition-all shadow-md"
          >
            <Calendar size={15} />
            Add CBC Calendar
          </button>
        </div>
      </div>

      {/* ── Event detail popup ──────────────────────────────────────────────── */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-card border border-border rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-2xl font-bold pr-4 leading-tight">{selected.title}</h3>
              <button
                onClick={() => setSelected(null)}
                className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 mt-0.5"
              >
                <X size={20} />
              </button>
            </div>

            {/* Date & time */}
            <div className="bg-[#D97757]/20 border border-[#D97757]/30 rounded-xl p-4 mb-3 flex items-center gap-3">
              <Clock className="text-[#D97757] flex-shrink-0" size={18} />
              <span className="text-sm">
                {new Date(selected.date + "T00:00:00").toLocaleDateString("en-US", {
                  month: "long", day: "numeric", year: "numeric",
                })}, {selected.time}
              </span>
            </div>

            {/* Location */}
            {selected.location && (
              <div className="bg-[#D97757]/10 border border-[#D97757]/20 rounded-xl p-4 mb-4 flex items-center gap-3">
                <MapPin className="text-[#D97757] flex-shrink-0" size={18} />
                <span className="text-sm">{selected.location}</span>
              </div>
            )}

            {/* Description */}
            {selected.description && (
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                {selected.description}
              </p>
            )}

            {/* Add to GCal */}
            <a
              href={buildGCalEventLink(selected)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#D97757] hover:underline font-medium"
            >
              Add to Google Calendar
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
