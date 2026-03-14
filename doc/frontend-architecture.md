# Frontend Architecture

## Overview

This document defines the frontend architecture for the project.
Its purpose is to ensure the frontend codebase remains scalable, readable, and maintainable as the application grows.

The architecture is based on:

- Atomic Design principles
- A design system–driven approach
- Clear separation of concerns between UI, layout, and application logic

This document is intended to be a long-living reference for frontend development.

---

## Goals

The frontend architecture aims to:

- Prevent structural and naming chaos as the codebase grows
- Encourage reuse of UI components
- Maintain visual and behavioural consistency
- Separate visual components from business logic
- Make theming and rebranding easier
- Provide a predictable structure for onboarding new developers

---

## Architecture (Atomic Design)

The frontend is organised into layers, each with a clear responsibility.
Each layer builds on top of the previous one, forming a structured and scalable UI system.

---

## Components

### Atoms

Atoms are the smallest UI building blocks.
They do not contain business or domain logic and are fully reusable.

Examples:

```text
components/atoms/Button/
components/atoms/Input/
components/atoms/Icon/
components/atoms/Badge/
components/atoms/Tag/
components/atoms/Card/
components/atoms/Tooltip/
components/atoms/Text/
components/atoms/Skeleton/
```

#### Rules

- No business logic
- Styled via global CSS and design tokens
- Implemented using variants (CVA)
- Exposed through a stable public API

### Molecules

Molecules are combinations of atoms that form meaningful UI actions.
They introduce semantic meaning, but still avoid page-level logic.

Examples:

```text
components/molecules/SearchInput/
components/molecules/AccountMenu/
components/molecules/AudioPlayerControl/
components/molecules/StationCard/
```

#### Rules

- Built only from atoms
- Represent a single semantic interaction
- No routing or page-level logic

### Organisms

Organisms are larger UI structures composed of multiple molecules.
They represent major sections of a page.

Examples:

```text
components/organisms/Header/
components/organisms/PlayerBar/
components/organisms/SidebarNav/
components/organisms/AISearchModal/
components/organisms/StationCard/
```

#### Rules

- Represent major page sections
- May contain local state
- Reusable across multiple pages

### Templates

Templates define page layouts and structural composition.
They describe where things go, not what they do.

Examples:

```text
components/templates/AppLayout/
```

#### Rules

- Compose organisms into layouts
- Define grid, spacing, and structure
- Do not contain business logic

### Pages

The pages directory contains the actual application views.
Pages assemble templates and components into the final user interface.

Examples:

```text
pages/Home/
pages/Library/
pages/Trending/
pages/ArticleDetail/
```

#### Rules

- Assemble templates and UI components
- May include page-specific logic
- Represent navigable routes

---

## UI Primitives (components/ui)

The `components/ui/` directory contains unstyled, accessible base components from [shadcn/ui](https://ui.shadcn.com/),
built on top of Radix UI primitives.

```text
components/ui/
├── button.tsx
├── dialog.tsx
├── select.tsx
└── ...
```

### Relationship to Atoms

| Layer | Purpose |
|---|---|
| `components/ui/` | Raw shadcn primitives — low-level, unstyled building blocks |
| `components/atoms/` | Design system wrappers — apply project tokens, variants, and API |

**Rule:** Never use `components/ui/` directly in pages or organisms. Always wrap through `components/atoms/` to keep the design system consistent and swappable.

---

## Layout System (layout/)

The `layout/` directory contains structural, non-visual layout primitives.
These are spacing and composition utilities — they control *how* content is arranged, not what it looks like.

```text
layout/
├── Container/       # Max-width page wrapper
├── Grid/            # CSS grid layout
├── Stack/           # Flex column/row with gap
├── Inline/          # Horizontal flex layout
├── Section/         # Vertical page section with spacing
├── Overlay/         # Absolute positioned overlay wrapper
├── PageShell.tsx    # Full-page shell with main content area
└── sticky/
    ├── StickyHeader.tsx
    ├── StickyBottom.tsx
    └── MobileNavSticky.tsx
```

#### Rules

- No visual styling (no colours, no shadows)
- No business logic
- Used to compose organisms and templates into structured pages

---

## Application Logic (lib/)

The `lib/` directory contains all non-UI application logic.

### Current Structure

```text
lib/
└── player/
    ├── useRadioPlayer.ts    # Howler.js audio playback hook
    └── radioPlayer.types.ts # Player state types
```

### Planned Structure

```text
lib/
├── player/
├── hooks/       # Shared custom React hooks
├── helpers/     # Pure utility functions
├── store/       # Global state management
└── types/       # Shared TypeScript types (Station, Filters, etc.)
```

---

## Styles

Global styles are stored in the styles directory.

```text
styles/
└── globals.css
```

#### Responsibilities

- Design tokens (colours, spacing, typography)
- Global utilities
- Animations and resets

---

## Assets

Static assets are stored separately from code.

```text
assets/
├── fonts/
└── images/
```

---

## Routing

Routing is handled by React Router. The router is defined in `routes/router.tsx`.

```text
routes/
└── router.tsx    # createBrowserRouter — route definitions
```

All routes are wrapped in the `AppLayout` template, which provides the persistent sidebar, header, and player bar.

---

## Project Structure

```text
frontend/
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   └── images/
│   ├── components/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── organisms/
│   │   ├── templates/
│   │   └── ui/              # shadcn primitives (do not use directly)
│   ├── layout/
│   │   ├── Container/
│   │   ├── Grid/
│   │   ├── Stack/
│   │   ├── Inline/
│   │   ├── Section/
│   │   ├── Overlay/
│   │   ├── PageShell.tsx
│   │   └── sticky/
│   ├── lib/
│   │   ├── player/
│   │   ├── hooks/           # planned
│   │   ├── helpers/         # planned
│   │   ├── store/           # planned
│   │   └── types/           # planned
│   ├── pages/
│   ├── routes/
│   │   └── router.tsx
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── vite.config.ts
```

---

## Component Internal Structure

Each component follows a predictable internal structure to support a design system.

Example: Button (Atom)

```text
components/atoms/Button/
├── Button.tsx           # React component implementation
├── button.variants.ts   # Design system variants (CVA)
├── button.types.ts      # Public TypeScript API
├── button.constants.ts  # Optional enums or constants
└── index.ts             # Public export
```
