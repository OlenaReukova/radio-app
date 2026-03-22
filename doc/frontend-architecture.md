# Frontend Architecture

## Overview

This document defines the frontend architecture for the project.
Its purpose is to ensure the frontend codebase remains scalable, readable, and maintainable as the application grows.

The architecture is based on:

- Feature-based organisation
- Clear separation between shared UI and feature-specific code
- A single UI primitive layer (shadcn/ui)

This document is intended to be a long-living reference for frontend development.

---

## Goals

The frontend architecture aims to:

- Group code by feature, not by type
- Make it easy to find everything related to one feature in one place
- Keep shared components free of feature-specific logic
- Provide a predictable structure for onboarding new developers

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
├── dialog.tsx
├── input.tsx
├── select.tsx
└── ...
```

#### Rules

- Never modified — regenerated via shadcn CLI
- Used directly only when no custom variant is required
- Go through `components/shared/` when a branded variant or custom API is needed

---

## components/shared/

Reusable UI components used across two or more features.
They have no knowledge of any specific feature's domain logic.

```text
components/shared/
├── Button.tsx       # Branded button with CVA variants
├── Input.tsx        # Styled input wrapper
├── Tag.tsx          # Label/tag with variants
├── Skeleton.tsx     # Loading skeleton variants
└── ...
```

#### Rules

- No feature-specific imports
- No routing or page-level logic
- Styled via CVA variants and Tailwind
- Types defined inline unless exported and reused elsewhere

---

## components/layout/

App-level structural components that define the page frame.

```text
components/layout/
├── AppLayout.tsx     # Root layout — composes header, sidebar, outlet, player bar
├── PageShell.tsx     # Full-page content wrapper
└── ...               # Sticky wrappers, hero, footer, etc.
```

#### Rules

- No feature-specific business logic
- `AppLayout` is the only place that composes features at the top level
- Shared state is passed to pages via React Router outlet context

---

## features/

Each feature directory contains everything related to that feature:
UI components, hooks, context, and types — all co-located.

```text
features/
└── <feature-name>/
    ├── <FeatureName>.tsx         # Main UI component(s)
    ├── use<FeatureName>.ts       # Custom hook(s) for logic
    ├── <FeatureName>Context.tsx  # Context provider (if shared state is needed)
    ├── <featureName>.types.ts    # Types and interfaces
    └── <FeatureName>.test.ts     # Tests
```

#### Rules

- A feature owns all its UI, logic, state, and types
- Features do not import from other features
- If something is needed by two features, move it to `components/shared/`
- Context providers are mounted in `AppLayout` and consumed via a custom hook

---

## pages/

Pages are thin — they assemble features into a view and wire up callbacks.
No business logic lives here.

```text
pages/
└── <PageName>/
    └── <PageName>.tsx
```

#### Rules

- Import from `features/` and `components/`
- May read outlet context to receive shared state
- No direct data fetching or domain logic

---

## routes/

```text
routes/
└── router.tsx    # createBrowserRouter — route definitions
```

All routes are children of `AppLayout`, which provides the persistent shell.

---

## styles/

```text
styles/
└── global.css
```

Responsibilities:

- `@layer base` — body background, typography scale
- `@layer components` — reusable CSS patterns (e.g. `.btn-premium`)
- `@layer utilities` — animations, gradient text, glow effects
- Scrollbar customisation

Design tokens (colours, z-index, animations) are defined in `tailwind.config.js`, not inline in components.

---

## Styling

| Tool | Purpose |
|---|---|
| Tailwind CSS | Utility-first styling |
| CVA (class-variance-authority) | Variant management in shared components |
| tailwind-merge + clsx (`cn()`) | Safe className merging |
| shadcn/ui | Base component primitives |

#### Rules

- Brand colours and z-index values are defined as tokens in `tailwind.config.js`
- Repeated visual patterns (glass card, gradient button) are extracted to `@layer components` in `global.css`
- Avoid hardcoded hex values in component files — use token-based classes

---

## Project Structure

```text
frontend/
├── src/
│   ├── components/
│   │   ├── ui/          # shadcn primitives — do not modify
│   │   ├── shared/      # reusable cross-feature components
│   │   └── layout/      # app shell, page wrappers
│   ├── features/
│   │   └── <feature>/   # UI + logic + state + types per feature
│   ├── pages/
│   │   └── <Page>/
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

1. Create `features/<feature-name>/`
2. Co-locate all UI, hooks, context, and types inside it
3. Mount any context provider in `AppLayout`
4. If a component is reused by another feature, move it to `components/shared/`
5. Do not import one feature from another — communicate via shared state or outlet context
