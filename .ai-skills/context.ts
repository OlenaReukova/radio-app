export const PROJECT_CONTEXT = `
Project: Radio Streaming Platform

Frontend stack:
- React 18
- TypeScript
- Vite
- TailwindCSS
- Radix UI components
- Howler.js for audio streaming

Backend stack:
- Node.js
- Express
- TypeScript
- Redis (Upstash) caching
- Jest testing

Project structure:
- frontend/src for UI
- backend/src for API and services
- backend/src/routes for API endpoints
- backend/src/services for business logic
- backend/src/redis for Redis client

Purpose:
A web radio platform where users can discover and stream radio stations.
Stations are fetched from external APIs and cached in Redis.
Audio playback handled on frontend with Howler.js.
`;