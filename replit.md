# Quick-Wit

## Overview

Quick-Wit is a Duolingo-style training app for verbal fluency and spontaneous communication. Users complete daily timed drills with AI-generated prompts to build speaking confidence, track progress through XP and streaks, and follow structured curriculum tracks (Verbal Reflexes, Persuasive Pitching, Narrative Weaving). The app includes both a consumer-facing practice platform and an extensive product management case study section showcasing research, experiments, GTM strategy, PRD, and roadmap documentation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, built using Vite
- **Routing**: Wouter (lightweight React router)
- **State Management**: Zustand with persistence middleware for global app state (user, progress, sessions)
- **Data Fetching**: TanStack React Query for server state management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS v4 with custom theme tokens, dual theme support (app theme vs PM documentation theme)
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript compiled with tsx for development, esbuild for production builds
- **Session Management**: express-session with secure cookie configuration
- **Password Hashing**: bcrypt for secure password storage
- **API Structure**: RESTful endpoints under `/api/` prefix for auth, users, progress, tracks, and sessions

### Data Storage
- **Database**: PostgreSQL accessed via Drizzle ORM
- **Schema Location**: `shared/schema.ts` contains all table definitions (users, userProgress, tracks, userTrackProgress, sessions)
- **Migrations**: Drizzle Kit for schema management (`npm run db:push`)
- **Connection**: Uses `DATABASE_URL` environment variable with connection pooling via pg Pool

### Authentication
- **Method**: Session-based authentication with HTTP-only cookies
- **Flow**: Email/password signup and login with bcrypt password hashing
- **Middleware**: Custom `requireAuth` middleware protects authenticated routes
- **Onboarding**: New users go through goal and practice time selection before accessing the dashboard

### Key Design Patterns
- **Shared Types**: Schema definitions in `shared/` directory are used by both frontend and backend
- **Path Aliases**: `@/` maps to client source, `@shared/` maps to shared directory
- **Dual Build**: Vite for client SPA, esbuild for server bundle with selective dependency bundling
- **Theme Switching**: Route-based theme detection (app routes vs product management documentation routes)

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, connection via `DATABASE_URL` environment variable

### Third-Party Services
- **Supabase**: Client SDK included for analytics event storage (configured via `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`)
- **Google Fonts**: Outfit, Plus Jakarta Sans, and IBM Plex Sans font families

### Key NPM Packages
- **@tanstack/react-query**: Server state management
- **drizzle-orm / drizzle-kit**: Database ORM and migrations
- **zustand**: Client state management
- **wouter**: Lightweight routing
- **recharts**: Data visualization for analytics and progress pages
- **zod**: Runtime schema validation
- **bcrypt**: Password hashing
- **express-session**: Session management

### Replit-Specific Integrations
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Development tooling (dev only)
- **@replit/vite-plugin-dev-banner**: Development banner (dev only)