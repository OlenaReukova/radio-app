# Backend Architecture

## Overview

The backend is an Express server written in TypeScript.
It serves radio station data to the frontend by querying a Turso (libSQL) database,
with Redis (Upstash) used as a caching layer to avoid redundant database queries.

Station data is sourced from the external [RadioBrowser API](https://api.radio-browser.info/)
and is periodically refreshed into the database via a dedicated refresh endpoint.

---

## Component Diagram

```mermaid
graph TD
    Client["Client (Frontend)"]
    Express["Express Server"]
    Redis["Redis (Upstash)\nCache Layer"]
    Turso["Turso (libSQL)\nDatabase"]
    RadioBrowser["RadioBrowser API\n(External)"]
    RadioService["Radio Service"]

    Client -->|HTTP GET /api/radio| Express
    Express --> RadioService
    RadioService -->|Cache read/write| Redis
    RadioService -->|SQL query| Turso
    RadioService -->|Fetch stations| RadioBrowser
```

---

## Request Flow — Cache HIT

```mermaid
sequenceDiagram
    participant Client
    participant Express Server
    participant Redis

    Client->>Express Server: GET /api/radio?country=...&genre=...
    Express Server->>Redis: GET cache key ("radio:" + country + ":" + genre)
    Redis-->>Express Server: Cache HIT — returns station list
    Express Server-->>Client: 200 OK · body: [stations] · X-Cache: HIT
```

---

## Request Flow — Cache MISS

```mermaid
sequenceDiagram
    participant Client
    participant Express Server
    participant Redis
    participant Turso DB

    Client->>Express Server: GET /api/radio?country=...&genre=...
    Express Server->>Redis: GET cache key ("radio:" + country + ":" + genre)
    Redis-->>Express Server: Cache MISS — null
    Express Server->>Turso DB: SELECT * FROM stations WHERE ... ORDER BY name LIMIT 500
    Turso DB-->>Express Server: rows
    Express Server->>Redis: SET cache key · TTL: 1h
    Express Server-->>Client: 200 OK · body: [stations] · X-Cache: MISS
```

---

## Request Flow — Refresh

```mermaid
sequenceDiagram
    participant Client
    participant Express Server
    participant RadioBrowser API
    participant Turso DB
    participant Redis

    Client->>Express Server: GET /api/refresh
    Express Server->>RadioBrowser API: Fetch all stations (paginated, mirror fallback)
    RadioBrowser API-->>Express Server: Station batches
    Express Server->>Turso DB: INSERT OR REPLACE INTO stations (batch write)
    Express Server->>Redis: Clear radio cache keys
    Express Server-->>Client: 200 OK · { ok: true, message: "Stations refreshed" }
```

---

## Directory Structure

```text
backend/
├── src/
│   ├── app.ts                  # Express app setup, middleware, CORS
│   ├── server.ts               # HTTP server entry point
│   ├── local.ts                # Local dev entry point
│   ├── config/
│   │   ├── env.ts              # Env var validation and export
│   │   └── config.ts           # App configuration (batch size, timeouts)
│   ├── db/
│   │   ├── db.ts               # Turso client initialisation
│   │   └── initDB.ts           # Schema creation on startup
│   ├── redis/
│   │   └── redisClient.ts      # Upstash Redis client initialisation
│   ├── routes/
│   │   ├── index.ts            # Route aggregator (/api)
│   │   ├── radio.routes.ts     # GET /api/radio — station query with caching
│   │   └── refresh.routes.ts   # GET /api/refresh — fetch + persist + cache clear
│   ├── services/
│   │   ├── radioService.ts         # Core service: fetch, save, query stations
│   │   └── radioService.instance.ts # Singleton service instance
│   └── utils/
│       ├── errorHandler.ts     # Global Express error handler
│       └── validators.ts       # Input validation helpers
├── package.json
└── tsconfig.json
```

---

## Environment Variables

| Variable             | Required | Description                        |
|----------------------|----------|------------------------------------|
| `PORT`               | No       | HTTP port (default: 5001)          |
| `FRONTEND_URL`       | Yes      | Allowed CORS origin                |
| `REDIS_URL`          | Yes      | Upstash Redis REST URL             |
| `REDIS_TOKEN`        | Yes      | Upstash Redis auth token           |
| `TURSO_DATABASE_URL` | Yes      | Turso database URL                 |
| `TURSO_AUTH_TOKEN`   | Yes      | Turso auth token                   |
