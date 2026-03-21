# Claude Builder Club @ ALU

> **🌍 Live site → [cbc-alu.vercel.app](https://cbc-alu.vercel.app)**

The official website of the **Claude Builder Club at African Leadership University** — an inclusive community for students who want to build AI-assisted solutions, develop technical skills, and learn how to use Claude responsibly and creatively.

---

## About the Club

The Claude Builder Club (CBC) is part of Anthropic's campus ambassador program. We meet bi-weekly to learn, build, and connect. No coding experience required — any major is welcome.

**Members get:**
- 🎁 Free Claude Pro (5× usage + Claude Code access)
- 💰 $25 in Anthropic API credits
- 🏆 Access to our end-of-semester Hackathon with prizes

**→ [Join the club](https://www.jotform.com/253555944387168)**

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| Bundler | [Vite 6](https://vitejs.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Routing | [React Router v7](https://reactrouter.com/) |
| UI primitives | [shadcn/ui](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Deployment | [Vercel](https://vercel.com/) |

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, photo carousel, perks, events, about, why Claude |
| `/team` | Meet the team |
| `/projects` | Member projects |
| `/events` | Full events calendar |
| `/gallery` | Photo gallery from meetings and tabling |
| `/faq` | Frequently asked questions (Claude Pro, API credits, Org ID) |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm

### Install & run

```bash
cd cbc-website
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

Output goes to `dist/`. The site is deployed automatically to Vercel on every push to `main`.

---

## Project Structure

```
cbc-website/
├── public/              # Static assets (photos, logos, team images)
│   ├── cbc-meeting-1/   # CBC Kickoff photos
│   ├── cbc-meeting-2/   # Claude Code Workshop photos
│   ├── tabling-1/       # Tabling event photos
│   ├── tabling-2/
│   ├── team/            # Team member photos
│   └── logos/
├── src/
│   ├── app/
│   │   ├── components/  # Navbar, Footer, PhotoCarousel, etc.
│   │   ├── pages/       # One file per route
│   │   ├── App.tsx
│   │   └── routes.tsx
│   └── styles/          # Tailwind + theme + fonts
├── index.html
├── vite.config.ts
└── package.json
```

---

## Adding Photos

1. Copy your photos (JPEG/PNG) to the appropriate folder under `public/`
2. Open `src/app/pages/Gallery.tsx` and add entries to the `galleryItems` array

---

## Contributing

We welcome contributions from CBC members and the wider community! See **[CONTRIBUTING.md](./CONTRIBUTING.md)** for guidelines on how to get involved — whether that's fixing a bug, adding a feature, or improving content.

---

## Team

Built and maintained by the **CBC @ ALU** technical team:

- **Bienvenu Cyuzuzo** — Technical Lead
- **Kevin Mbonimpaye** — Technical

---

## Connect

- 🔗 **LinkedIn** — [Claude Builder Club ALU](https://www.linkedin.com/company/claude-builder-club-alu/)
- 📧 **Email** — [cbcalu.rw@gmail.com](mailto:cbcalu.rw@gmail.com)

---

## License

Content and photos are property of the Claude Builder Club at ALU
