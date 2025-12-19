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
components/atoms/Divider/
components/atoms/Avatar/
```

#### Rules

- No business logic
- Styled via global CSS and design tokens
- Implemented using variants (e.g. CVA)
- Exposed through a stable public API

### Molecules

Molecules are combinations of atoms that form meaningful UI actions.
They introduce semantic meaning, but still avoid page-level logic.

Examples:

```text
components/molecules/SearchInput/
components/molecules/AudioPlayerControl/
components/molecules/StationCard/
components/molecules/FilterSelect/
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
components/organisms/Footer/
components/organisms/StationGrid/
components/organisms/SidebarNav/
components/organisms/AuthModal/
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
components/templates/MainLayout/
components/templates/AuthLayout/
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
pages/Home.tsx
pages/Library.tsx
pages/Trending.tsx
pages/ArticleDetail.tsx
```

#### Rules

- Assemble templates and UI components
- May include page-specific logic
- Represent navigable routes

### Application Logic (lib)

The lib directory contains all non-UI application logic.

#### Structure

```text
lib/
├── hooks/
├── helpers/
├── store/
└── types/
```

#### Rules

- Independent from UI components
- Shared across the application
- Contains hooks, state management, helpers, and type definitions

### Styles

Global styles are stored in the styles directory.

```text
styles/
└── globals.css
```

#### Responsibilities

- Design tokens (colours, spacing, typography)
- Global utilities
- Animations and resets

### Assets

Static assets are stored separately from code.

```text
assets/
├── fonts/
└── images/
```

### Project Structure

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
│   │   └── templates/
│   ├── lib/
│   │   ├── helpers/
│   │   ├── hooks/
│   │   ├── store/
│   │   └── types/
│   ├── pages/
│   ├── routes/
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── index.tsx
├── package.json
└── ...
```

### Component Internal Structure

Each component follows a predictable internal structure to support a design system.

Example: Button (Atom)

```text
components/atoms/Button/
├── Button.tsx
├── button.variants.ts
├── button.types.ts
├── button.constants.ts
└── index.ts
```

#### Responsibilities

- Button.tsx — React component implementation
- \*.variants.ts — design system variants
- \*.types.ts — public TypeScript API
- \*.constants.ts — optional enums or constants
- index.ts — public export
