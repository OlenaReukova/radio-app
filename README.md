# 📻 RadioWave is a modern web radio application that allows users to discover, play, and organise radio stations from around the world.

The project is currently under active development and focuses on a clean user experience, fast performance, and future AI-powered features.

#### Current Status

The project is in progress.
Core functionality is working, new UI design has been created in Figma but is not yet fully implemented, and the backend foundation is ready for further feature development.

#### What Is Already Implemented
Radio Browsing:
- Users can see different categories or types of radio stations — e.g. genres or predefined categories — and interact with them.

Audio Streaming: 
- Station audio is streamed using an HTML audio player component React H5 Audio Player.

Station Selection:
- You can click on a station and start playback.

Radio Playback
- Play and pause live radio stations
- Audio playback directly in the browser
- Only one station plays at a time
- Recently played stations are tracked locally

Station Discovery
- Radio stations are loaded from an external radio directory API
- Stations are displayed as cards
- Basic station information is shown

#### Frontend

The frontend has been fully migrated from JavaScript to TypeScript. This change improves type safety, reduces runtime errors, and makes the codebase easier to maintain as the project grows.

Styling has been moved to Tailwind CSS, which allows faster UI iteration and more consistent styling across components.

#### The frontend is built with:

- React 18
- Vite for fast development and builds
- TypeScript
- Tailwind CSS
- Radix UI components for accessible, reusable UI primitives
- Recharts for data visualisation
- Embla Carousel
- Lucide React for icons
- Howler.js for audio playback

#### Backend

The backend has been extended and refactored, and is currently built with:

- Express as the HTTP server
- Redis for caching and fast data access
- Turso (libSQL) as the database layer
- Jest for testing
- RadioBrowser API https://api.radio-browser.info/

The main data storage layer is Turso (libSQL), which provides a modern SQL-based database with good performance and simple integration. 
It is well-suited for this project due to its lightweight nature and scalability.
Redis is used as an in-memory data store and cache. It helps speed up responses for frequently accessed data and reduces unnecessary database queries.

The backend architecture documentation is available in the repository:
https://github.com/OlenaReukova/radio-app/tree/main/doc


#### New design

<img width="401" height="785" alt="Screenshot 2025-12-16 at 11 10 02" src="https://github.com/user-attachments/assets/3ce862fa-7f05-4793-bece-a4ab37f4c388" />

<img width="325" height="718" alt="Screenshot 2025-12-16 at 11 10 37" src="https://github.com/user-attachments/assets/1604d731-f046-4284-813f-5fb950c01124" />


Figma Design link:
https://www.figma.com/design/3BwG4akQWpyTTF9hjbQseU/Radio-Web-App

### Planned Functionality

#### Advanced Audio Experience
- Persistent mini player available on all pages
- Full-screen player on mobile devices
- Volume control with saved user preferences
- Playback queue to play stations automatically
- Visual equaliser showing active playback
- Support for device media controls (headphones, Bluetooth)

#### Powerful Station Discovery
- Browse a large catalogue of radio stations
- Search stations by name, country, or genre
- Filter stations by country, genre, and mood
- Discover trending stations based on real usage
- Pagination for easy browsing of large lists

#### Personal Library & Collections
- Save favourite radio stations
- View listening history
- Create custom collections (playlists)
- Add and remove stations from collections
- Sync user data across devices when signed in

#### User Accounts & Profiles
- User registration and login
- Personal profiles with listening statistics
- Secure session handling
- Separation between guest and signed-in user data
- Ability to manage and delete account data

#### Social & Sharing Features
- Share radio stations via links and social media
- Open shared links and start playback instantly
- See what stations are popular with other users
- Discover trending genres and countries

#### AI-Powered Features
- Mood-based station recommendations
- Smart search using natural language
- Personalised recommendations based on listening habits
- Listening insights and statistics dashboards
- Daily mixes are generated automatically for users

#### Editorial Content
- Music and radio-related articles
- Article reading pages with clean layout
- Save and like articles
- Share articles with others
- Browse articles by category or search

#### Design & User Experience
- Fully implemented modern Figma-based design
- Desktop sidebar and mobile bottom navigation
- Smooth animations and transitions
- Clear loading and empty states
- Toast notifications for user actions
- Accessibility support (keyboard navigation, screen readers)

#### Performance & Reliability
- Fast load times
- Cached data for better performance
- Graceful offline handling
- Stable backend API
- Scalable architecture for future growth


# The current version is going to be updated to completly new design

#### Desktop view

<div align="center">
<img width="1021" alt="radio-app" src="https://github.com/OlenaReukova/radio-app/assets/34659641/86188bb6-1ae1-4f9d-93ad-1b5459df0145">
</div>
  
#### Mobile view
<div align="center">
<img width="412" alt="mobile" src="https://github.com/OlenaReukova/radio-app/assets/34659641/f5907ddd-60c2-4241-86ac-59e652313c87">
</div>

# Technologies

Technologies: React.js, Vite, the RadioBrowser API, and the React H5 Audio Player component.

# Install

This is how you can install this project.

```bash
npm create vite@latest
```

# Run

Start the project using commnad below.

```bash
npm run dev
```
