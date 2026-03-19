import { Calendar, MapPin, Users, ExternalLink, ImageIcon, Github, Video, FileText } from "lucide-react";
import { useState } from "react";

export function Events() {
  const [selectedMonth, setSelectedMonth] = useState("all");

  const upcomingEvents = [
    {
      id: 1,
      date: "2026-03-25",
      title: "AI Workshop: Building with Claude API",
      time: "18:00 - 20:00",
      location: "Innovation Hub, ALU Kigali",
      description: "Learn how to integrate Claude API into your applications. Hands-on workshop covering authentication, prompting best practices, and real-world use cases.",
      attendees: 45,
      spotsLeft: 15,
    },
    {
      id: 2,
      date: "2026-04-02",
      title: "Hackathon: AI for Africa",
      time: "09:00 - 21:00",
      location: "Main Campus",
      description: "24-hour hackathon focused on building AI solutions for African challenges. Form teams, build with Claude, and compete for prizes.",
      attendees: 120,
      spotsLeft: 30,
    },
    {
      id: 3,
      date: "2026-04-15",
      title: "Tech Talk: The Future of AI in Education",
      time: "17:00 - 19:00",
      location: "Auditorium A",
      description: "Join us for an inspiring discussion on how AI is transforming education across Africa, featuring guest speakers from leading tech companies.",
      attendees: 80,
      spotsLeft: 20,
    },
    {
      id: 4,
      date: "2026-04-22",
      title: "Project Showcase & Demo Day",
      time: "16:00 - 19:00",
      location: "Innovation Hub",
      description: "Members present their AI projects built during the semester. Great opportunity to see what's possible and get inspired.",
      attendees: 60,
      spotsLeft: 40,
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
        photo: "https://images.unsplash.com/photo-1561089489-f13d5e730d72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2xhc3Nyb29tJTIwd29ya3Nob3AlMjB0ZWNobm9sb2d5JTIwbGVhcm5pbmd8ZW58MXx8fHwxNzczODY2NzU2fDA&ixlib=rb-4.1.0&q=80&w=400",
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
        photo: "https://images.unsplash.com/photo-1560651921-19590b2b7ad7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWNrYXRob24lMjB0ZWFtJTIwY29kaW5nJTIwdG9nZXRoZXIlMjBuaWdodHxlbnwxfHx8fDE3NzM4NjY3NTZ8MA&ixlib=rb-4.1.0&q=80&w=400",
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
        photo: "https://images.unsplash.com/photo-1758270705317-3ef6142d306f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwc3R1ZGVudCUyMGdyb3VwJTIwcHJvamVjdCUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzczODY2NzU2fDA&ixlib=rb-4.1.0&q=80&w=400",
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
        photo: "https://images.unsplash.com/photo-1770364292936-1800aa621b3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2x1YiUyMHRlYW0lMjBwaG90byUyMGRpdmVyc2UlMjBzdHVkZW50c3xlbnwxfHx8fDE3NzM4NjY3NTJ8MA&ixlib=rb-4.1.0&q=80&w=400",
        github: "#",
      },
    },
    {
      id: 5,
      date: "2025-11-18",
      title: "Build with Claude: Chatbot Workshop",
      location: "Tech Lab",
      attendees: 48,
      resources: {
        slides: "#",
        github: "#",
        recording: "#",
      },
    },
    {
      id: 6,
      date: "2025-10-25",
      title: "Welcome Week Mixer",
      location: "Student Lounge",
      attendees: 85,
      resources: {
        photo: "https://images.unsplash.com/photo-1646579885920-0c9a01cb7078?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGFpJTIwd29ya3Nob3AlMjBsYXB0b3AlMjBwcmVzZW50YXRpb258ZW58MXx8fHwxNzczODY2NzUyfDA&ixlib=rb-4.1.0&q=80&w=400",
      },
    },
  ];

  const addToCalendar = (event: typeof upcomingEvents[0]) => {
    const eventDate = new Date(event.date + "T" + event.time.split(" - ")[0]);
    const endDate = new Date(event.date + "T" + event.time.split(" - ")[1]);
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${eventDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTEND:${endDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
SUMMARY:${event.title}
LOCATION:${event.location}
DESCRIPTION:${event.description}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${event.title.replace(/[^a-z0-9]/gi, "_")}.ics`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#D97757]/10 to-transparent py-20 border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Events</h1>
          <p className="text-xl text-[#9CA3AF] max-w-2xl">
            Join us for workshops, hackathons, and tech talks. Build skills, make connections, and shape the future of AI.
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-2">Upcoming Events</h2>
            <div className="h-1 w-24 bg-[#D97757]"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 hover:border-[#D97757] transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-[#D97757] font-semibold">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                {event.spotsLeft <= 20 && (
                  <div className="text-xs bg-[#D97757]/20 text-[#D97757] px-3 py-1 rounded-full">
                    {event.spotsLeft} spots left
                  </div>
                )}
              </div>

              <h3 className="text-2xl font-bold mb-3 group-hover:text-[#D97757] transition-colors">
                {event.title}
              </h3>

              <p className="text-[#9CA3AF] mb-4 leading-relaxed">
                {event.description}
              </p>

              <div className="space-y-2 text-[#9CA3AF] mb-6">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-[#D97757]" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#D97757]" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-[#D97757]" />
                  <span>{event.attendees} registered</span>
                </div>
              </div>

              <button
                onClick={() => addToCalendar(event)}
                className="w-full bg-[#D97757] text-[#0D0D0D] py-3 rounded-xl hover:bg-[#E08967] transition-all font-semibold"
              >
                Add to Calendar
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 bg-[#1A1A1A]/50 border-y border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-2">Past Events</h2>
            <div className="h-1 w-24 bg-[#D97757]"></div>
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
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#D97757] transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-[#9CA3AF] mb-4">
                    <MapPin size={14} />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#9CA3AF] mb-4">
                    <Users size={14} />
                    <span>{event.attendees} attended</span>
                  </div>

                  {/* Resources */}
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
                        Photo
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