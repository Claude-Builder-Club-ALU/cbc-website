import { ExternalLink, Lock } from "lucide-react";
import { useState } from "react";

export function Projects() {
  const [formData, setFormData] = useState({
    projectName: "",
    builderName: "",
    email: "",
    description: "",
    projectLink: "",
  });

  const projects = [
    {
      id: 1,
      name: "EduAssist AI",
      builder: "Adanna Nwosu",
      description: "An AI-powered educational assistant that helps students with homework and concept explanations. Built with Claude API.",
      tags: ["Claude API", "Education", "Web App"],
      link: "#",
    },
    {
      id: 2,
      name: "AgriTech Advisor",
      builder: "Tunde Oluwaseun",
      description: "Smart farming assistant providing crop recommendations and pest management advice for African farmers.",
      tags: ["Claude API", "Agriculture", "Mobile"],
      link: "#",
    },
    {
      id: 3,
      name: "HealthBot Rwanda",
      builder: "Grace Uwase",
      description: "Medical information chatbot providing health guidance in Kinyarwanda and English. HIPAA-compliant.",
      tags: ["Claude API", "Healthcare", "Chatbot"],
      link: "#",
    },
    {
      id: 4,
      name: "LegalAid Connect",
      builder: "Kwesi Mensah",
      description: "AI legal assistant helping Ghanaians understand their rights and navigate legal processes.",
      tags: ["Claude API", "Legal", "Web App"],
      link: "#",
    },
    {
      id: 5,
      name: "CodeMentor Africa",
      builder: "Zainab Mohammed",
      description: "Interactive coding tutor for beginners learning Python, JavaScript, and web development.",
      tags: ["Claude API", "Education", "Developer Tools"],
      link: "#",
    },
    {
      id: 6,
      name: "SmartTranslate",
      builder: "Jean-Paul Kabanda",
      description: "Context-aware translation tool for African languages, preserving cultural nuances.",
      tags: ["Claude API", "Translation", "Web App"],
      link: "#",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate ALU email
    if (!formData.email.endsWith("@alustudent.com")) {
      alert("Please use your ALU email address (@alustudent.com)");
      return;
    }

    // In a real app, this would submit to a backend
    alert("Project submitted successfully! Our team will review it soon.");
    
    // Reset form
    setFormData({
      projectName: "",
      builderName: "",
      email: "",
      description: "",
      projectLink: "",
    });
  };

  const handleGoogleSignIn = () => {
    // In a real app, this would trigger Google OAuth for ALU accounts
    alert("Google Sign-In would be integrated here for ALU accounts only");
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#D97757]/10 to-transparent py-20 border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Projects</h1>
          <p className="text-xl text-[#9CA3AF] max-w-2xl">
            Explore innovative AI projects built by CBC members. Get inspired and share your own creations.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-2">Featured Projects</h2>
          <div className="h-1 w-24 bg-[#D97757]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 hover:border-[#D97757] transition-all group"
            >
              <h3 className="text-xl font-bold mb-2 group-hover:text-[#D97757] transition-colors">
                {project.name}
              </h3>
              <p className="text-[#9CA3AF] text-sm mb-4">by {project.builder}</p>
              <p className="text-[#F5F5F5] mb-6 leading-relaxed">
                {project.description}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-[#D97757]/20 text-[#D97757] px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={project.link}
                className="flex items-center gap-2 text-[#D97757] hover:underline"
              >
                View Project
                <ExternalLink size={16} />
              </a>
            </div>
          ))}
        </div>

        {/* Submission Form */}
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold mb-4">Submit Your Project</h2>
            <div className="h-1 w-24 bg-[#D97757] mx-auto mb-4"></div>
            <p className="text-[#9CA3AF]">
              Built something amazing with Claude? Share it with the community!
            </p>
          </div>

          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8">
            {/* Google Sign-In Notice */}
            <div className="bg-[#D97757]/10 border border-[#D97757]/30 rounded-xl p-4 mb-6 flex items-start gap-3">
              <Lock className="text-[#D97757] mt-1 flex-shrink-0" size={20} />
              <div className="text-sm">
                <p className="text-[#F5F5F5] font-semibold mb-1">ALU Students Only</p>
                <p className="text-[#9CA3AF]">
                  Project submissions are restricted to ALU email addresses (@alustudent.com) to maintain community integrity.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="projectName" className="block text-[#F5F5F5] mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  id="projectName"
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  required
                  className="w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded-xl px-4 py-3 text-[#F5F5F5] focus:border-[#D97757] focus:outline-none transition-colors"
                  placeholder="My Awesome AI Project"
                />
              </div>

              <div>
                <label htmlFor="builderName" className="block text-[#F5F5F5] mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="builderName"
                  value={formData.builderName}
                  onChange={(e) => setFormData({ ...formData, builderName: e.target.value })}
                  required
                  className="w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded-xl px-4 py-3 text-[#F5F5F5] focus:border-[#D97757] focus:outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[#F5F5F5] mb-2">
                  ALU Email *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    pattern=".*@alustudent\.com$"
                    className="w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded-xl px-4 py-3 pr-10 text-[#F5F5F5] focus:border-[#D97757] focus:outline-none transition-colors"
                    placeholder="yourname@alustudent.com"
                  />
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={18} />
                </div>
                <p className="text-xs text-[#9CA3AF] mt-1">Must be an @alustudent.com email</p>
              </div>

              <div>
                <label htmlFor="description" className="block text-[#F5F5F5] mb-2">
                  Project Description *
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={4}
                  className="w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded-xl px-4 py-3 text-[#F5F5F5] focus:border-[#D97757] focus:outline-none transition-colors resize-none"
                  placeholder="Describe your project, what it does, and what technologies you used..."
                />
              </div>

              <div>
                <label htmlFor="projectLink" className="block text-[#F5F5F5] mb-2">
                  Project Link *
                </label>
                <input
                  type="url"
                  id="projectLink"
                  value={formData.projectLink}
                  onChange={(e) => setFormData({ ...formData, projectLink: e.target.value })}
                  required
                  className="w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded-xl px-4 py-3 text-[#F5F5F5] focus:border-[#D97757] focus:outline-none transition-colors"
                  placeholder="https://github.com/yourusername/project"
                />
                <p className="text-xs text-[#9CA3AF] mt-1">GitHub repo, live demo, or project website</p>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#D97757] text-[#0D0D0D] py-3 rounded-xl font-semibold hover:bg-[#E08967] transition-all hover:shadow-lg hover:shadow-[#D97757]/20"
                >
                  Submit Project
                </button>
              </div>
            </form>

            {/* Alternative: Google Sign-In */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#2A2A2A]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-[#1A1A1A] text-[#9CA3AF]">Or</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="mt-6 w-full bg-[#0D0D0D] border border-[#2A2A2A] text-[#F5F5F5] py-3 rounded-xl font-semibold hover:border-[#D97757] transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google (ALU email only)
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
