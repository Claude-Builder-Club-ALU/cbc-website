import { Linkedin } from "lucide-react";

export function Team() {
  const leadershipTeam = [
    {
      name: "Amara Okafor",
      role: "President",
      photo: "https://images.unsplash.com/photo-1742934029147-6f83f681daa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tYW4lMjBlbmdpbmVlciUyMHRlY2hub2xvZ3klMjBzbWlsaW5nfGVufDF8fHx8MTc3Mzg2Njc1Mnww&ixlib=rb-4.1.0&q=80&w=600",
      linkedin: "#",
    },
    {
      name: "Kwame Mensah",
      role: "Vice President",
      photo: "https://images.unsplash.com/photo-1596580817363-a4a8f67d4bc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMG1hbiUyMHNvZnR3YXJlJTIwZGV2ZWxvcGVyJTIwcG9ydHJhaXQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzczODY2NzUyfDA&ixlib=rb-4.1.0&q=80&w=600",
      linkedin: "#",
    },
    {
      name: "Zara Kimathi",
      role: "Technical Lead",
      photo: "https://images.unsplash.com/photo-1760433403526-47f671997ca1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc3R1ZGVudCUyMGxlYWRlciUyMGNvbmZpZGVudCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3Mzg2Njc1Mnww&ixlib=rb-4.1.0&q=80&w=600",
      linkedin: "#",
    },
    {
      name: "Tunde Oluwaseun",
      role: "Events Coordinator",
      photo: "https://images.unsplash.com/photo-1652772589253-c1ab2308fbf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNvZnR3YXJlJTIwZW5naW5lZXIlMjBwb3J0cmFpdCUyMHNtaWxpbmd8ZW58MXx8fHwxNzczODY2NzU3fDA&ixlib=rb-4.1.0&q=80&w=600",
      linkedin: "#",
    },
  ];

  const members = [
    "Adanna Nwosu",
    "Jean-Paul Kabanda",
    "Grace Uwase",
    "Youssef El-Amin",
    "Fatima Hassan",
    "Chidi Okeke",
    "Aisha Bello",
    "Kofi Asante",
    "Naledi Mthembu",
    "Ibrahim Kamara",
    "Zainab Mohammed",
    "Tendai Moyo",
    "Emeka Okonkwo",
    "Amina Diallo",
    "Lesedi Nkosi",
    "Blessing Okafor",
  ];

  const alumni = [
    { name: "Samuel Owusu", year: "2024", role: "AI Engineer at Andela" },
    { name: "Makena Wanjiru", year: "2024", role: "ML Research at Google" },
    { name: "Ayo Adebayo", year: "2023", role: "Founder, TechStart Africa" },
    { name: "Lindiwe Dlamini", year: "2023", role: "Data Scientist at Meta" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#D97757]/10 to-transparent py-20 border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Team</h1>
          <p className="text-xl text-[#9CA3AF] max-w-2xl">
            Meet the passionate individuals leading the Claude Builder Club and shaping the future of AI at ALU.
          </p>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-2">Leadership Team</h2>
          <div className="h-1 w-24 bg-[#D97757]"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {leadershipTeam.map((member, index) => (
            <div
              key={index}
              className="group bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden hover:border-[#D97757] transition-all"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 group-hover:text-[#D97757] transition-colors">
                  {member.name}
                </h3>
                <p className="text-[#9CA3AF] mb-4">{member.role}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#0D0D0D] text-[#9CA3AF] hover:text-[#D97757] hover:bg-[#2A2A2A] transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* General Members */}
      <section className="py-20 bg-[#1A1A1A]/50 border-y border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-2">Active Members</h2>
            <div className="h-1 w-24 bg-[#D97757]"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {members.map((member, index) => (
              <div
                key={index}
                className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-xl p-4 text-center hover:border-[#D97757] transition-all group"
              >
                <div className="w-16 h-16 rounded-full bg-[#D97757]/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#D97757] transition-colors">
                  <span className="text-2xl font-bold text-[#D97757] group-hover:text-[#0D0D0D] transition-colors">
                    {member.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <p className="font-semibold text-sm group-hover:text-[#D97757] transition-colors">
                  {member}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-2">Notable Alumni</h2>
          <div className="h-1 w-24 bg-[#D97757]"></div>
          <p className="text-[#9CA3AF] mt-4">
            Former members making an impact in the tech industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {alumni.map((alum, index) => (
            <div
              key={index}
              className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 hover:border-[#D97757] transition-all group"
            >
              <div className="text-[#D97757] text-sm font-semibold mb-2">
                Class of {alum.year}
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-[#D97757] transition-colors">
                {alum.name}
              </h3>
              <p className="text-[#9CA3AF]">{alum.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-20 bg-gradient-to-b from-[#D97757]/5 to-transparent border-t border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Want to Join Our Team?</h2>
          <p className="text-xl text-[#9CA3AF] mb-8">
            We're always looking for passionate students who want to build with AI and make an impact.
          </p>
          <a
            href="/projects"
            className="inline-block bg-[#D97757] text-[#0D0D0D] px-8 py-4 rounded-xl font-semibold hover:bg-[#E08967] transition-all hover:shadow-lg hover:shadow-[#D97757]/30"
          >
            Apply Now
          </a>
        </div>
      </section>
    </div>
  );
}
