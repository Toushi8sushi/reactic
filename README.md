# Horizon — Physics and Astronomy Club, IIT Madras

Website for the Physics and Astronomy Club of IIT Madras. Built with React 19, React Router 7, and Vite 8.

## Getting Started

```sh
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Tech Stack

- **React 19** — UI library
- **React Router DOM 7** — Client-side routing
- **Vite 8** — Build tool and dev server
- **ESLint 10** — Linting (flat config)

All content is static (JSON files in `src/data/`). Styling is plain CSS organized under `src/styles/`.

## Project Structure

```
src/
├── components/     # Header, Footer, Layout
├── data/           # Static JSON (projects, events, articles, team)
├── pages/          # Route page components (10 routes)
├── styles/         # Split CSS files (variables, reset, layout, components, pages)
├── App.jsx         # Route definitions
├── main.jsx        # Entry point
└── index.css       # @import entry for styles/
```

## License

MIT
