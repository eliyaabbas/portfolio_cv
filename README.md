# Professional Portfolio & CV

A high-performance, visually rich professional portfolio built with **Astro** and integrated with **Tableau Public**. This project showcases a blend of software engineering projects and data visualization expertise.

## 🚀 Features

- **High Performance:** Built with Astro for optimized static site generation.
- **Modern UI/UX:** Features a sleek glassmorphism design, fluid typography, and responsive layouts.
- **Interactive Elements:** Smooth scroll animations powered by ScrollReveal and typing effects.
- **GitHub Integration:** Dynamically fetches project statistics (stars) and profile-level activity (followers, repo counts, bio) using the GitHub API with robust fallbacks.
- **Tableau Integration:** Specialized components for showcasing BI dashboards with optimized thumbnails and direct links.
- **Modular Architecture:** Component-based structure for easy maintenance and scalability.

## 🛠️ Tech Stack

- **Framework:** [Astro](https://astro.build/)
- **Styling:** Vanilla CSS (CSS Variables, Flexbox/Grid)
- **Icons:** [Astro Icon](https://github.com/natemoo-re/astro-icon) (Lucide & Simple Icons)
- **Animations:** ScrollReveal.js
- **Deployment:** Vercel

## 📂 Project Structure

Inside this Astro project, you'll find:

```text
/
├── public/              # Static assets (images, icons, avatar)
├── src/
│   ├── components/      # Modular UI components (Hero, About, Projects, etc.)
│   │   ├── TableauProjects.astro # Specialized BI Dashboard showcase
│   │   └── ...
│   ├── layouts/         # Page layouts (Layout.astro)
│   ├── pages/           # Route components (index.astro)
│   ├── scripts/         # Client-side interactivity (main.js)
│   └── styles/          # Global design system (global.css)
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command | Action |
| :--- | :--- |
| `npm install` | Installs dependencies |
| `npm run dev` | Starts local dev server at `localhost:4321` |
| `npm run build` | Build your production site to `./dist/` |
| `npm run preview` | Preview your build locally |

## 📝 License

This project is licensed under the [LICENSE](LICENSE) file included in the repository.

---
Built with ❤️ using Astro.
