# Contributing to CBC @ ALU

Thank you for your interest in contributing to the Claude Builder Club website! Whether you're a club member, a fellow developer, or just someone who wants to help — contributions are welcome.

## New to open-source contributions?

If you've never submitted a pull request before, this guide is a great starting point:

**📚 [How To: Fork a GitHub Repository & Submit a Pull Request](https://jarv.is/notes/how-to-pull-request-fork-github)**

It walks you through the full workflow: forking, cloning, branching, committing, and opening a PR.

---

## Quick Start

1. **Fork this repository** to your GitHub account

2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/cbc-alu.git
   cd cbc-alu/cbc-website
   ```

3. **Install dependencies and start the dev server**:
   ```bash
   npm install
   npm run dev
   ```
   The site will be live at `http://localhost:5173`

4. **Create a branch** for your change:
   ```bash
   git checkout -b your-feature-or-fix
   ```

5. **Make your changes** and verify them locally

6. **Commit and push**:
   ```bash
   git add .
   git commit -m "Brief description of your change"
   git push -u origin your-feature-or-fix
   ```

7. **Open a pull request** from your fork into the `main` branch of this repo

---

## What Can You Contribute?

- 🐛 **Bug fixes** — something broken? Open an issue or just fix it
- 🎨 **UI improvements** — better layouts, responsiveness, accessibility
- 📝 **Content updates** — events, projects, team info, FAQ answers
- 🖼️ **Photos** — add new event photos to the gallery (see [README → Adding Photos](./README.md#adding-photos))
- ✨ **New features** — new pages, components, or interactions
- 📖 **Documentation** — improve the README, add code comments, etc.

---

## Development Guidelines

- Follow the existing code style (TypeScript, Tailwind utility classes, component-per-file)
- All pages live in `src/app/pages/`, all shared components in `src/app/components/`
- Photos go in `public/<event-folder>/` — JPEG or PNG only, no HEIC
- Test on both mobile and desktop before submitting
- Keep pull requests focused — one feature or fix per PR is easier to review

---

## Questions?

- Open a [GitHub Issue](../../issues) to start a discussion
- 🔗 Message us on [LinkedIn](https://www.linkedin.com/company/claude-builder-club-alu/)
- 📧 Email us at [cbcalu.rw@gmail.com](mailto:cbcalu.rw@gmail.com)
- Check existing pull requests and issues for context on ongoing work

We appreciate every contribution, big or small. Thanks for helping build something for the CBC community! 🚀
