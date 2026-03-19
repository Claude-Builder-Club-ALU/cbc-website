import { useState } from "react";
import Masonry from "react-responsive-masonry";

type FilterType = "all" | "workshops" | "hackathons" | "socials";

export function Gallery() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const galleryItems = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1562910859-be83f1df7b56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdW5pdmVyc2l0eSUyMHN0dWRlbnRzJTIwdGVjaCUyMHdvcmtzaG9wJTIwY29sbGFib3JhdGlvbnxlbnwxfHx8fDE3NzM4NjY3NTB8MA&ixlib=rb-4.1.0&q=80&w=800",
      title: "AI Workshop: Introduction to Claude",
      category: "workshops",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1710770563074-6d9cc0d3e338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHN0dWRlbnRzJTIwY29kaW5nJTIwaGFja2F0aG9uJTIwZ3JvdXB8ZW58MXx8fHwxNzczODY2NzUwfDA&ixlib=rb-4.1.0&q=80&w=800",
      title: "Winter Hackathon 2026",
      category: "hackathons",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1770364292936-1800aa621b3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2x1YiUyMHRlYW0lMjBwaG90byUyMGRpdmVyc2UlMjBzdHVkZW50c3xlbnwxfHx8fDE3NzM4NjY3NTJ8MA&ixlib=rb-4.1.0&q=80&w=800",
      title: "CBC Team Social Event",
      category: "socials",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1646579885920-0c9a01cb7078?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGFpJTIwd29ya3Nob3AlMjBsYXB0b3AlMjBwcmVzZW50YXRpb258ZW58MXx8fHwxNzczODY2NzUyfDA&ixlib=rb-4.1.0&q=80&w=800",
      title: "Building with Claude API Workshop",
      category: "workshops",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1768796370577-c6e8b708b980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjB3b3Jrc2hvcCUyMHByZXNlbnRhdGlvbiUyMHNjcmVlbiUyMHN0dWRlbnRzfGVufDF8fHx8MTc3Mzg2Njc1Nnww&ixlib=rb-4.1.0&q=80&w=800",
      title: "Tech Talk: Future of AI",
      category: "workshops",
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1560651921-19590b2b7ad7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWNrYXRob24lMjB0ZWFtJTIwY29kaW5nJTIwdG9nZXRoZXIlMjBuaWdodHxlbnwxfHx8fDE3NzM4NjY3NTZ8MA&ixlib=rb-4.1.0&q=80&w=800",
      title: "Hackathon: AI for Africa",
      category: "hackathons",
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1561089489-f13d5e730d72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2xhc3Nyb29tJTIwd29ya3Nob3AlMjB0ZWNobm9sb2d5JTIwbGVhcm5pbmd8ZW58MXx8fHwxNzczODY2NzU2fDA&ixlib=rb-4.1.0&q=80&w=800",
      title: "Python Programming Workshop",
      category: "workshops",
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1758270705317-3ef6142d306f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwc3R1ZGVudCUyMGdyb3VwJTIwcHJvamVjdCUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzczODY2NzU2fDA&ixlib=rb-4.1.0&q=80&w=800",
      title: "Welcome Week Mixer",
      category: "socials",
    },
    {
      id: 9,
      url: "https://images.unsplash.com/photo-1742934029147-6f83f681daa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tYW4lMjBlbmdpbmVlciUyMHRlY2hub2xvZ3klMjBzbWlsaW5nfGVufDF8fHx8MTc3Mzg2Njc1Mnww&ixlib=rb-4.1.0&q=80&w=800",
      title: "Project Showcase Presentation",
      category: "workshops",
    },
    {
      id: 10,
      url: "https://images.unsplash.com/photo-1596580817363-a4a8f67d4bc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMG1hbiUyMHNvZnR3YXJlJTIwZGV2ZWxvcGVyJTIwcG9ydHJhaXQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzczODY2NzUyfDA&ixlib=rb-4.1.0&q=80&w=800",
      title: "Member Spotlight: Success Story",
      category: "socials",
    },
    {
      id: 11,
      url: "https://images.unsplash.com/photo-1760433403526-47f671997ca1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc3R1ZGVudCUyMGxlYWRlciUyMGNvbmZpZGVudCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3Mzg2Njc1Mnww&ixlib=rb-4.1.0&q=80&w=800",
      title: "Leadership Team Portrait",
      category: "socials",
    },
    {
      id: 12,
      url: "https://images.unsplash.com/photo-1652772589253-c1ab2308fbf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNvZnR3YXJlJTIwZW5naW5lZXIlMjBwb3J0cmFpdCUyMHNtaWxpbmd8ZW58MXx8fHwxNzczODY2NzU3fDA&ixlib=rb-4.1.0&q=80&w=800",
      title: "Collaborative Coding Session",
      category: "hackathons",
    },
  ];

  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  const filters: { value: FilterType; label: string }[] = [
    { value: "all", label: "All" },
    { value: "workshops", label: "Workshops" },
    { value: "hackathons", label: "Hackathons" },
    { value: "socials", label: "Socials" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#D97757]/10 to-transparent py-20 border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Gallery</h1>
          <p className="text-xl text-[#9CA3AF] max-w-2xl">
            Moments that matter. Explore photos from our workshops, hackathons, and community events.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-40 bg-[#0D0D0D]/95 backdrop-blur-sm border-b border-[#2A2A2A] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
                  activeFilter === filter.value
                    ? "bg-[#D97757] text-[#0D0D0D]"
                    : "bg-[#1A1A1A] text-[#F5F5F5] hover:bg-[#2A2A2A] border border-[#2A2A2A]"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Masonry columnsCount={3} gutter="1.5rem" className="masonry-grid">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl border border-[#2A2A2A] hover:border-[#D97757] transition-all cursor-pointer"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <h3 className="text-white font-semibold text-lg">{item.title}</h3>
              </div>
            </div>
          ))}
        </Masonry>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#9CA3AF] text-xl">No photos found for this category.</p>
          </div>
        )}
      </section>

      {/* Custom CSS for responsive masonry */}
      <style>{`
        @media (max-width: 768px) {
          .masonry-grid {
            column-count: 1 !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .masonry-grid {
            column-count: 2 !important;
          }
        }
      `}</style>
    </div>
  );
}
