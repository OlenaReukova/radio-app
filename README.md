# RadioWave

A modern web radio application for discovering, playing, and organising radio stations from around the world.

> **Status:** Active development — core functionality is working; new Figma-based UI is partially implemented.

[Figma Design](https://www.figma.com/design/3BwG4akQWpyTTF9hjbQseU/Radio-Web-App) · [Backend Architecture Docs](https://github.com/OlenaReukova/radio-app/tree/main/doc)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [How to Start](#how-to-start)
- [Getting Started](#getting-started)
- [Planned Features](#planned-features)
- [Screenshots](#screenshots)

---

## Features

**Radio Browsing** — Browse stations by genre and category.
**Audio Streaming** — Live audio playback directly in the browser.
**Station Selection** — Click any station card to start playback.
**Playback Controls** — Play, pause; only one station plays at a time.
**Recently Played** — Locally tracked listening history.
**Station Discovery** — Stations loaded from the [RadioBrowser API](https://api.radio-browser.info/).

---

## Tech Stack

### Frontend

| Tool | Purpose |
|---|---|
| React 18 + TypeScript | UI framework |
| Vite | Dev server & build |
| Tailwind CSS | Styling |
| Radix UI | Accessible UI primitives |
| Howler.js | Audio playback |
| Embla Carousel | Carousel component |
| Lucide React | Icons |
| Recharts | Data visualisation |

### Backend

| Tool | Purpose |
|---|---|
| Express | HTTP server |
| Turso (libSQL) | Primary database |
| Redis | Caching layer |
| Jest | Testing |
| RadioBrowser API | Station data source |

---

## How to Start

**1.** Fork the repository by clicking the Fork button on GitHub.

**2.** Clone your fork:

```bash
git clone https://github.com/<your-username>/radio-app.git
cd radio-app
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Redis instance (local or hosted via [Upstash](https://console.upstash.com/redis)) — provides `REDIS_URL` and `REDIS_TOKEN`
- Turso database — provides `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN`

### Installation

**Backend:**

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file in the `backend/` directory with the following variables:

```env
PORT=5001
FRONTEND_URL=
REDIS_URL=
REDIS_TOKEN=
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=
```

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173`, backend at `http://localhost:5001`.

**Verify the backend is running:**

```bash
curl http://localhost:5001/api/stations
```

### Run Tests

```bash
cd backend
npm test
```

---

## Planned Features

<details>
<summary>Audio Experience</summary>

- Persistent mini player on all pages
- Full-screen player on mobile
- Volume control with saved preferences
- Playback queue
- Visual equaliser
- Media controls (headphones, Bluetooth)
</details>

<details>
<summary>Station Discovery</summary>

- Search by name, country, genre
- Filters by country, genre, mood
- Trending stations
- Pagination
</details>

<details>
<summary>Personal Library</summary>

- Favourite stations
- Listening history
- Custom collections
- Cross-device sync
</details>

<details>
<summary>User Accounts</summary>

- Registration and login
- Personal profiles with stats
- Guest vs. signed-in data separation
</details>

<details>
<summary>AI Features</summary>

- Mood-based recommendations
- Natural language search
- Personalised daily mixes
- Listening insights dashboard
</details>

<details>
<summary>Social & Sharing</summary>

- Share stations via links
- Trending genres and countries
</details>

<details>
<summary>Editorial Content</summary>

- Music and radio-related articles
- Save, like, and share articles
- Browse by category or search
</details>

<details>
<summary>Design & Performance</summary>

- Desktop sidebar and mobile bottom navigation
- Smooth animations and transitions
- Accessibility support (keyboard navigation, screen readers)
- Cached data for better performance
- Graceful offline handling
</details>

---

## Screenshots

### New Design (in progress)

| Desktop| Mobile |
|---|---|
| ![New design 1](https://github.com/user-attachments/assets/3ce862fa-7f05-4793-bece-a4ab37f4c388) | ![New design 2](https://github.com/user-attachments/assets/1604d731-f046-4284-813f-5fb950c01124) |

### Current Version

| Desktop | Mobile |
|---|---|
| ![Desktop](https://github.com/OlenaReukova/radio-app/assets/34659641/86188bb6-1ae1-4f9d-93ad-1b5459df0145) | ![Mobile](https://github.com/OlenaReukova/radio-app/assets/34659641/f5907ddd-60c2-4241-86ac-59e652313c87) |
