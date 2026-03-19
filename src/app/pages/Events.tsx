import { MapPin, Users, ImageIcon, Github, Video, FileText } from "lucide-react";
import { EventCalendar, type CalEvent } from "../components/EventCalendar";

// ─────────────────────────────────────────────────────────────────────────────
// Upcoming events — these are shown both in the calendar and in the card list.
// To add a new event, push an entry here and it will appear in both places.
// ─────────────────────────────────────────────────────────────────────────────
const upcomingEvents: CalEvent[] = [
  {
    id: 1,
    date: "2026-03-25",
    title: "AI Workshop: Building with Claude API",
    time: "18:00 - 20:00",
    location: "Innovation Hub, ALU Kigali",
    description:
      "Learn how to integrate Claude API into your applications. Hands-on workshop covering authentication, prompting best practices, and real-world use cases.",
  },
  {
    id: 2,
    date: "2026-04-02",
    title: "Hackathon: AI for Africa",
    time: "09:00 - 21:00",
    location: "Main Campus",
    description:
      "24-hour hackathon focused on building AI solutions for African challenges. Form teams, build with Claude, and compete for prizes.",
  },
  {
    id: 3,
    date: "2026-04-15",
    title: "Tech Talk: The Future of AI in Education",
    time: "17:00 - 19:00",
    location: "Auditorium A",
    description:
      "Join us for an inspiring discussion on how AI is transforming education across Africa, featuring guest speakers from leading tech companies.",
  },
  {
    id: 4,
    date: "2026-04-22",
    title: "Project Showcase & Demo Day",
    time: "16:00 - 19:00",
    location: "Innovation Hub",
    description:
      "Members present their AI projects built during the semester. Great opportunity to see what's possible and get inspired.",
  },
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
  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-[#D97757]/10 to-transparent py-20 border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Events</h1>
          <p className="text-xl text-[#9CA3AF] max-w-2xl">
            Join us for workshops, hackathons, and tech talks. Build skills, make
            connections, and shape the future of AI.
          </p>
        </div>
      </section>

      {/* ── Calendar + Upcoming Events (two-column) ── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-4xl font-bold mb-2">Upcoming Events</h2>
          <div className="h-1 w-24 bg-[#D97757]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Calendar widget */}
          {/*
            Pass your Google Calendar ID here to enable the "Add CBC Calendar"
            subscribe button. Leave undefined to show a placeholder alert.

            calendarId="abc123@group.calendar.google.com"
          */}
          <EventCalendar events={upcomingEvents} />

          {/* Upcoming event cards */}
          <div className="flex flex-col gap-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-5 hover:border-[#D97757] transition-all group"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="text-[#D97757] text-sm font-semibold mb-1">
                      {new Date(event.date + "T00:00:00").toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <h3 className="text-lg font-bold group-hover:text-[#D97757] transition-colors leading-snug">
                      {event.title}
                    </h3>
                  </div>
                </div>

                <p className="text-[#9CA3AF] text-sm mb-4 leading-relaxed line-clamp-2">
                  {event.description}
                </p>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#9CA3AF]">
                  <span>🕐 {event.time}</span>
                  <span>📍 {event.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Past Events ── */}
      <section className="py-20 bg-[#1A1A1A]/50 border-y border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-2">Past Events</h2>
            <div className="h-1 w-24 bg-[#D97757]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-2xl overflow-hidden hover:border-[#D97757] transition-all group"
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
                  <div className="flex items-center gap-2 text-sm text-[#9CA3AF] mb-1">
                    <MapPin size={14} />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#9CA3AF] mb-4">
                    <Users size={14} />
                    <span>{event.attendees} attended</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {event.resources.slides && (
                      <a
                        href={event.resources.slides}
                        className="flex items-center gap-1 text-xs bg-[#2A2A2A] text-[#F5F5F5] px-3 py-1.5 rounded-lg hover:bg-[#D97757] hover:text-[#0D0D0D] transition-all"
                      >
                        <FileText size={14} />
                        Slides
                      </a>
                    )}
                    {event.resources.photo && (
                      <a
                        href={event.resources.photo}
                        className="flex items-center gap-1 text-xs bg-[#2A2A2A] text-[#F5F5F5] px-3 py-1.5 rounded-lg hover:bg-[#D97757] hover:text-[#0D0D0D] transition-all"
                      >
                        <ImageIcon size={14} />
                        Photos
                      </a>
                    )}
                    {event.resources.github && (
                      <a
                        href={event.resources.github}
                        className="flex items-center gap-1 text-xs bg-[#2A2A2A] text-[#F5F5F5] px-3 py-1.5 rounded-lg hover:bg-[#D97757] hover:text-[#0D0D0D] transition-all"
                      >
                        <Github size={14} />
                        Demo
                      </a>
                    )}
                    {event.resources.recording && (
                      <a
                        href={event.resources.recording}
                        className="flex items-center gap-1 text-xs bg-[#2A2A2A] text-[#F5F5F5] px-3 py-1.5 rounded-lg hover:bg-[#D97757] hover:text-[#0D0D0D] transition-all"
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
