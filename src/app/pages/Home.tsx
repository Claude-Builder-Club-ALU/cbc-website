import { Link } from "react-router";
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";
import { PhotoCarousel } from "../components/PhotoCarousel";
import { TestimonialCarousel } from "../components/TestimonialCarousel";

export function Home() {
  const upcomingEvents = [
    {
      id: 1,
      date: "2026-03-25",
      title: "AI Workshop: Building with Claude API",
      time: "18:00 - 20:00",
      location: "Innovation Hub, ALU Kigali",
      attendees: 45,
    },
    {
      id: 2,
      date: "2026-04-02",
      title: "Hackathon: AI for Africa",
      time: "09:00 - 21:00",
      location: "Main Campus",
      attendees: 120,
    },
    {
      id: 3,
      date: "2026-04-15",
      title: "Tech Talk: The Future of AI in Education",
      time: "17:00 - 19:00",
      location: "Auditorium A",
      attendees: 80,
    },
  ];

  const addToCalendar = (event: typeof upcomingEvents[0]) => {
    // Generate .ics file content
    const eventDate = new Date(event.date + "T" + event.time.split(" - ")[0]);
    const endDate = new Date(event.date + "T" + event.time.split(" - ")[1]);
    
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${eventDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTEND:${endDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
SUMMARY:${event.title}
LOCATION:${event.location}
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
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#D97757]/5 via-transparent to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Logo Combo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-16 h-16 rounded-xl bg-[#D97757] flex items-center justify-center shadow-lg shadow-[#D97757]/20">
              <span className="text-2xl font-bold text-[#0D0D0D]">ALU</span>
            </div>
            <span className="text-[#9CA3AF] text-2xl">×</span>
            <div className="w-16 h-16 rounded-xl bg-[#D97757] flex items-center justify-center shadow-lg shadow-[#D97757]/20">
              <span className="text-2xl font-bold text-[#0D0D0D]">C</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Build the future.
            <br />
            <span className="text-[#D97757]">With AI.</span>
          </h1>

          {/* Subtext */}
          <p className="text-xl sm:text-2xl text-[#9CA3AF] max-w-3xl mx-auto mb-12 leading-relaxed">
            Join the Claude Builder Club at African Leadership University. Where tech meets African excellence.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.jotform.com/253555944387168"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#D97757] text-[#0D0D0D] px-8 py-4 rounded-xl font-semibold hover:bg-[#E08967] transition-all hover:shadow-lg hover:shadow-[#D97757]/30 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Join Us
              <ArrowRight size={20} />
            </a>
            <Link
              to="/projects"
              className="border-2 border-[#D97757] text-[#D97757] px-8 py-4 rounded-xl font-semibold hover:bg-[#D97757] hover:text-[#0D0D0D] transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              See Our Work
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#D97757]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D97757]/5 rounded-full blur-3xl"></div>
      </section>

      {/* Photo Carousel */}
      <section className="py-16 border-t border-[#2A2A2A]">
        <PhotoCarousel />
      </section>

      {/* Upcoming Events */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-2">Upcoming Events</h2>
            <p className="text-[#9CA3AF]">Don't miss out on what's next</p>
          </div>
          <Link
            to="/events"
            className="hidden sm:flex items-center gap-2 text-[#D97757] hover:underline"
          >
            View All
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 hover:border-[#D97757] transition-all group"
            >
              <div className="text-[#D97757] font-semibold mb-2">
                {new Date(event.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-[#D97757] transition-colors">
                {event.title}
              </h3>
              <div className="space-y-2 text-[#9CA3AF] mb-6">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  <span>{event.attendees} attending</span>
                </div>
              </div>
              <button
                onClick={() => addToCalendar(event)}
                className="w-full bg-[#2A2A2A] text-[#F5F5F5] py-2.5 rounded-xl hover:bg-[#D97757] hover:text-[#0D0D0D] transition-all font-semibold"
              >
                Add to Calendar
              </button>
            </div>
          ))}
        </div>

        <Link
          to="/events"
          className="sm:hidden flex items-center justify-center gap-2 text-[#D97757] hover:underline mt-8"
        >
          View All Events
          <ArrowRight size={20} />
        </Link>
      </section>

      {/* Who We Are */}
      <section className="py-20 bg-[#1A1A1A]/50 border-y border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Who We Are</h2>
          <div className="h-1 w-24 bg-[#D97757] mx-auto mb-8"></div>
          <p className="text-lg text-[#9CA3AF] leading-relaxed mb-6">
            The Claude Builder Club at African Leadership University brings together ambitious students, technologists, and innovators who are passionate about harnessing the power of AI to solve real problems.
          </p>
          <p className="text-lg text-[#9CA3AF] leading-relaxed">
            We're more than a tech club—we're a community dedicated to building the future of AI in Africa. Through workshops, hackathons, and collaborative projects, we empower our members to create meaningful solutions using Claude and cutting-edge AI tools.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Members Say</h2>
          <TestimonialCarousel />
        </div>
      </section>
    </div>
  );
}
