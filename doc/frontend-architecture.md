# Frontend Architecture

## Overview

This document defines the frontend architecture for the project.
Its purpose is to ensure the frontend codebase remains scalable, readable, and maintainable as the application grows.

The architecture is based on:

- Feature-based organisation
- Clear separation between shared UI and feature-specific code
- A single UI primitive layer (shadcn/ui)

---

## Goals

The frontend architecture aims to:

- Group code by feature, not by type
- Make it easy to find everything related to one feature in one place
- Keep shared components free of feature-specific logic

---

## Architecture (Feature-Based)

The codebase is organised into four top-level concerns:

| Directory | Purpose |
|---|---|
| `components/ui/` | Unstyled shadcn/Radix primitives — single source of truth for base elements |
| `components/shared/` | Reusable UI components used across two or more features |
| `components/layout/` | App-level layout shells and structural wrappers |
| `features/` | All feature-specific code — UI, logic, state, types co-located |

---

## components/ui/

Raw [shadcn/ui](https://ui.shadcn.com/) components built on Radix UI primitives.
These are the lowest-level building blocks. Never modified directly.

```text
components/ui/
├── button.tsx
├── badge.tsx
├── card.tsx
├── dialog.tsx
├── input.tsx
├── select.tsx
├── slider.tsx
├── tooltip.tsx
└── ...
```

#### Rules

- Never modified — regenerated via shadcn CLI
- Not used directly in features — go through `components/shared/` when a custom variant or API is needed
- Used directly only when no custom variant is required

---

## components/shared/

Reusable UI components that are used in two or more features.
They have no knowledge of any specific feature's domain logic.

```text
components/shared/
├── Button.tsx          # CVA variants: primary, glass, active, ghost, cta, avatar, aiContext
├── AlbumArt.tsx        # Station artwork with size and glow variants
├── EqualizerBars.tsx   # Animated equalizer indicator
├── Icon.tsx
├── Input.tsx
├── Tag.tsx
├── Skeleton.tsx        # Skeleton, SkeletonAvatar, SkeletonCard, SkeletonText
├── FavoriteButton.tsx
├── FavoriteToggle.tsx
├── ShareButton.tsx
├── AddToQueueButton.tsx
├── GenreTagGroup.tsx
├── AccountMenu.tsx
├── Tooltip.tsx
└── Sidebar.tsx
```

#### Rules

- No feature-specific imports
- No routing or page-level logic
- Styled via CVA variants and Tailwind
- Types defined inline (no separate `.types.ts` file unless the type is exported and reused elsewhere)

---

## components/layout/

App-level structural components that define the page frame.

```text
components/layout/
├── AppLayout.tsx        # Root layout — wraps RadioPlayerProvider, renders Header, Sidebar, Outlet, PlayerBar
├── Hero.tsx             # Landing hero section
├── Footer.tsx
├── PageShell.tsx
├── StickyHeader.tsx
├── StickyBottom.tsx
└── MobileNavSticky.tsx
```

#### Rules

- No feature-specific business logic
- `AppLayout` is the only component that composes features at the top level
- Outlet context is used to pass shared state down to pages

---

## features/

Each feature directory contains all code related to that feature:
UI components, hooks, context, types. No feature imports from another feature directly.

### features/player/

Audio playback feature — the core feature of the app.

```text
features/player/
├── RadioPlayerContext.tsx    # React context provider wrapping useRadioPlayer
├── useRadioPlayer.ts         # Howler.js playback hook — play, pause, stop, volume, status
├── useRadioPlayer.test.ts
├── player.types.ts           # PlayerStatus, RadioStation, RadioPlayerState
├── PlayerBar.tsx             # Fixed bottom bar — station info, controls, volume, expand trigger
├── ExpandedMobilePlayer.tsx  # Full-screen mobile player overlay
├── MiniPlayerControls.tsx    # Play/pause/stop icon controls
└── VolumeControl.tsx         # Volume slider
```

State flow:

```
RadioPlayerProvider (AppLayout)
  └── useRadioPlayerContext()
        ├── PlayerBar
        ├── ExpandedMobilePlayer
        └── StationCard (play trigger via outlet context)
```

### features/stations/

Station browsing and playback triggering.

```text
features/stations/
├── StationGrid.tsx    # Fetches and renders the station list, handles filters from outlet context
└── StationCard.tsx    # Station card — artwork, genre tags, play button, favourite/share/queue actions
```

### features/search/

AI-powered station discovery.

```text
features/search/
├── SearchInput.tsx        # Controlled search input with clear button
├── AISearchModal.tsx      # Modal shell for the AI search experience
└── AISearchAssistant.tsx  # AI chat interface inside the modal
```

### features/navigation/

App navigation — header and sidebar.

```text
features/navigation/
├── CleanHeader.tsx    # Fixed top bar — logo, search, filter toggle, AI search button, account menu
└── RadioSidebar.tsx   # Desktop left sidebar — genre filters, country selector
```

---

## pages/

Pages are thin — they assemble features into a view and pass context down.
No business logic lives here.

```text
pages/
└── Home/
    └── Home.tsx    # Renders Hero + StationGrid, wires outlet context to callbacks
```

---

## routes/

```text
routes/
└── router.tsx    # createBrowserRouter — AppLayout wraps all routes
```

Route tree:

```
AppLayout
└── / → Home
```

---

## styles/

```text
styles/
└── global.css
```

Responsibilities:

- `@layer base` — body background, typography scale
- `@layer components` — reusable CSS patterns: `.btn-premium`, `.btn-outline-premium`
- `@layer utilities` — animations (`animate-float`, `animate-slide-in`, etc.), `.gradient-text`, `.neon-glow`
- Scrollbar customisation

Design tokens (colours, z-index, animations) are defined in `tailwind.config.js`.

---

## Styling

| Tool | Purpose |
|---|---|
| Tailwind CSS | Utility-first styling |
| CVA (class-variance-authority) | Variant management in shared components |
| tailwind-merge + clsx (`cn()`) | Safe className merging — `components/ui/utils.ts` |
| shadcn/ui | Base component primitives |

Custom design tokens in `tailwind.config.js`:

- `colors.brand` — `brand-purple` (`#935CFF`), `brand-pink` (`#E054FF`)
- `colors.surface` — `surface-base`, `surface-raised`, `surface-deep`
- `zIndex` — `header`, `player`, `overlay`, `mobile-nav`

---

## Project Structure

```text
frontend/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn primitives — do not modify
│   │   ├── shared/          # reusable cross-feature components
│   │   └── layout/          # AppLayout, Hero, Footer, sticky wrappers
│   ├── features/
│   │   ├── player/          # audio engine + player UI
│   │   ├── stations/        # station grid + card
│   │   ├── search/          # AI search
│   │   └── navigation/      # header + sidebar
│   ├── pages/
│   │   └── Home/
│   ├── routes/
│   │   └── router.tsx
│   ├── styles/
│   │   └── global.css
│   └── main.tsx
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## Adding a new feature

1. Create `features/<feature-name>/` directory
2. Put all UI components, hooks, context, and types inside it
3. If a component is needed by two or more features, move it to `components/shared/`
4. Wire it into `AppLayout` or a page via outlet context — do not import features from other features directly
