# Slay the Spire 2 — Character Build Guides

A fan-made, locally-hosted reference site for **Slay the Spire 2** character builds and documentation. Built with [Next.js 15](https://nextjs.org/), [Tailwind CSS v4](https://tailwindcss.com/), and [shadcn/ui](https://ui.shadcn.com/).

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Locally](#running-locally)
- [Project Structure](#project-structure)
- [Adding Content](#adding-content)
  - [Adding Build Guides (Markdown)](#adding-build-guides-markdown)
  - [Adding Character Images](#adding-character-images)
  - [Adding or Editing Characters](#adding-or-editing-characters)
- [Deployment](#deployment)
  - [Option A — Vercel (Recommended)](#option-a--vercel-recommended)
  - [Option B — GitHub Pages (Static Export)](#option-b--github-pages-static-export)
- [Notes on @vercel/analytics](#notes-on-vercelanalytics)

---

## Prerequisites

Before getting started, make sure you have the following installed:

| Tool | Version | Download |
|------|---------|----------|
| **Node.js** | v18.18.0 or later | https://nodejs.org |
| **npm** | Comes with Node.js | — |

You can verify your versions by running:

```bash
node -v
npm -v
```

> **Tip:** If you manage multiple Node versions, consider using [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows).

---

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

2. **Install dependencies:**

```bash
npm install
```

This will install all packages listed in `package.json`, including Next.js, Tailwind CSS, React Markdown, and the shadcn/ui component library.

---

## Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page will hot-reload as you make edits.

### Other scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server at `localhost:3000` |
| `npm run build` | Build the production bundle |
| `npm run start` | Run the built production server |
| `npm run lint` | Run Next.js ESLint checks |

---

## Project Structure

```
/
├── app/
│   ├── globals.css             # Global styles + Tailwind theme variables
│   ├── layout.tsx              # Root layout (fonts, metadata)
│   ├── page.tsx                # Home page (character select)
│   └── characters/
│       └── [id]/
│           └── page.tsx        # Individual character page (dynamic route)
│
├── components/
│   ├── character-page.tsx      # Full character detail layout
│   ├── character-portrait.tsx  # Character image card
│   ├── character-section.tsx   # Home page character selection card
│   ├── builds-doc-panel.tsx    # Sidebar + markdown viewer panel
│   ├── stats-panel.tsx         # Starting stats display
│   ├── theme-provider.tsx      # Dark/light theme wrapper
│   └── ui/                     # shadcn/ui component primitives
│
├── lib/
│   ├── characters.ts           # Character data + TypeScript types
│   └── utils.ts                # Tailwind class merge utility (cn)
│
├── public/
│   ├── docs/                   # ← Add your Markdown build guides here
│   │   └── {character-id}/
│   │       └── {build-id}.md
│   └── images/
│       └── characters/         # ← Add character portrait images here
│           └── {character-id}.png
│
├── components.json             # shadcn/ui configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies and scripts
├── postcss.config.js           # PostCSS (required for Tailwind v4)
└── tsconfig.json               # TypeScript configuration
```

---

## Adding Content

### Adding Build Guides (Markdown)

Build guides are written in **Markdown** and are served as static files from the `public/docs/` directory. Each build corresponds to a `.md` file named after its `id` in `lib/characters.ts`.

**File path format:**
```
public/docs/{character-id}/{build-id}.md
```

**Example — Ironclad's Strength Build:**
```
public/docs/ironclad/strength.md
```

**Example Markdown file:**
```markdown
# Strength Build

The Ironclad's Strength Build focuses on stacking Strength as quickly as possible...

## Core Cards

- **Inflame** — Gain 2 Strength permanently.
- **Limit Break** — Double your Strength (Exhaust).
- **Heavy Blade** — Deal 14 damage. Strength applies 3x.

## Key Relics

| Relic | Why It's Good |
|-------|---------------|
| Paper Phrog | +2 Strength after each combat |
| Vajra | Start each combat with 1 Strength |

## Tips

> Always prioritize Limit Break upgrades — it converts your Strength lead into massive burst.
```

The site will automatically display the markdown when a user selects that build in the sidebar. If the file is missing, it shows a helpful placeholder message.

---

### Adding Character Images

Character portraits are loaded from `public/images/characters/`. The filename must match the character's `id` exactly.

**File path format:**
```
public/images/characters/{character-id}.png
```

**Current character IDs:**
- `ironclad`
- `silent`
- `necrobinder`
- `regent`
- `defect`

If an image file is missing, the portrait card will display a placeholder with a reminder of the expected path. The images should ideally be **3:4 aspect ratio** (portrait orientation), around **200×267px** or larger.

---

### Adding or Editing Characters

All character data lives in `lib/characters.ts`. Each entry in the `characters` array follows this structure:

```typescript
{
  id: 'ironclad',              // Used in URLs and file paths — keep it lowercase, no spaces
  name: 'Ironclad',            // Display name
  color: 'ironclad',           // Matches a CSS theme variable (see globals.css)
  tagline1: 'A warrior...',    // Short description line
  tagline2: 'Strength builds', // Secondary flavour line (shown in italics)
  startingHp: 80,
  startingGold: 99,
  startingRelic: 'Burning Blood',
  relicDescription: 'At the end of combat, heal 6 HP.',
  builds: [
    { id: 'overview', name: 'Character Overview', description: 'General tips and playstyle' },
    { id: 'strength', name: 'Strength Build', description: 'Stack Strength, hit hard' },
  ],
}
```

**To add a new character:**

1. Add a new entry to the `characters` array in `lib/characters.ts`.
2. Add a matching color variable in `app/globals.css` under both `:root` and `@theme inline`:
   ```css
   --mycharacter: oklch(0.70 0.18 200);
   ```
3. Add the color to the `colorMap` in `components/character-section.tsx` and `components/character-page.tsx`.
4. Add a portrait image at `public/images/characters/{id}.png`.
5. Add build guide files at `public/docs/{id}/{build-id}.md`.

---

## Deployment

### Option A — Vercel (Recommended)

Vercel is built by the same team as Next.js and offers the simplest deployment with zero configuration.

1. Push your project to GitHub.
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **"Add New Project"** and import your repository.
4. Vercel auto-detects Next.js — click **Deploy**.

Every push to your `main` branch will automatically trigger a new deployment. Preview deployments are created for every pull request.

---

### Option B — GitHub Pages (Static Export)

GitHub Pages serves static files, so you need to configure Next.js to output a static build.

**Step 1 — Enable static export in `next.config.ts`:**

```typescript
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
}
```

> The `images: { unoptimized: true }` line is required because Next.js's built-in image optimization is not compatible with static exports.

**Step 2 — Set `basePath` if deploying to a subdirectory:**

If your site will be at `https://username.github.io/repo-name/` (not a custom root domain), you need to set the base path:

```typescript
const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/repo-name',
  images: { unoptimized: true },
}
```

**Step 3 — Build and export:**

```bash
npm run build
```

This will create an `out/` folder with your fully static site.

**Step 4 — Deploy via GitHub Actions:**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: out

      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

Then go to your GitHub repository → **Settings** → **Pages** → set the source to **"GitHub Actions"**.

---

## Notes on @vercel/analytics

The project includes `@vercel/analytics` in `app/layout.tsx`. This package tracks page views and is free on Vercel's Hobby plan.

- **On Vercel:** Works out of the box, no configuration needed.
- **On GitHub Pages or other hosts:** The `<Analytics />` component will simply do nothing — it won't break anything, but you can safely remove it from `app/layout.tsx` if you prefer a clean build with no third-party scripts:

```tsx
// Remove this import:
import { Analytics } from '@vercel/analytics/next'

// And remove this from the JSX:
<Analytics />
```

---

## License

This is a fan project. All Slay the Spire 2 game content, characters, and trademarks belong to [Mega Crit Games](https://www.megacrit.com/).
