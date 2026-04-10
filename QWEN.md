# ELCRM Frontend - Project Context

## Project Overview

**ELCRM** is a Customer Relationship Management (CRM) system built as a modern single-page application (SPA). The frontend is developed with React 19, TypeScript, and Vite, featuring a modular architecture with feature-based organization.

### Core Technologies

| Category | Technology |
|----------|------------|
| **Framework** | React 19 with TypeScript |
| **Build Tool** | Vite 7 |
| **Styling** | Tailwind CSS 4, shadcn/ui components |
| **State Management** | Zustand |
| **Routing** | React Router v7 |
| **Data Fetching** | TanStack React Query |
| **Forms** | React Hook Form with Zod validation |
| **i18n** | react-i18next (Russian, English, Kyrgyz) |
| **UI Components** | Radix UI primitives, Lucide icons |
| **Charts** | Recharts |
| **Animations** | Framer Motion |
| **Notifications** | Sonner (toast notifications) |
| **Drag & Drop** | @dnd-kit |
| **Deployment** | Netlify |

### Architecture

The project follows a **feature-based modular architecture**:

```
src/
├── components/          # Shared UI components (shadcn/ui)
├── lib/                 # Utility functions
├── locales/             # i18n translation files
├── modules/             # Feature modules (domain-specific)
│   ├── activity-logs/
│   ├── auth/
│   ├── clients/
│   ├── dashboard/
│   ├── finances/
│   ├── kanban/
│   ├── products/
│   ├── search/
│   ├── settings/
│   └── prototype/
└── shared/              # Cross-module shared code
    ├── api/             # API layer
    ├── components/      # Shared components (Layout, Sidebar, etc.)
    ├── enums/           # TypeScript enums
    ├── guards/          # Route guards
    ├── hooks/           # Custom hooks
    ├── icons/           # Custom icons
    ├── store/           # Zustand stores
    ├── types/           # TypeScript types
    └── utils/           # Shared utilities
```

## Building and Running

### Prerequisites

- Node.js (version compatible with the project)
- pnpm (recommended) or npm

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev          # Start development server with HMR
```

### Production

```bash
pnpm build        # Build for production (TypeScript + Vite)
pnpm preview      # Preview production build locally
```

### Code Quality

```bash
pnpm lint         # Run ESLint
```

## Development Conventions

### Code Style

- **TypeScript**: Strict typing with `tsconfig.app.json` and `tsconfig.node.json` project references
- **ESLint**: Configured with `typescript-eslint`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`
- **Formatting**: Follow existing code patterns (2-space indentation, single quotes)

### Naming Conventions

- **Files**: PascalCase for components (e.g., `DashboardPage.tsx`), camelCase for utilities
- **Components**: PascalCase (e.g., `ProtectedRoute`, `GlobalSearch`)
- **Hooks/Stores**: camelCase with descriptive prefixes (e.g., `useClientsStore`, `useThemeColor`)
- **Types/Interfaces**: PascalCase (e.g., `Client`, `ClientStatus`)

### Module Structure

Each feature module follows a consistent structure:

```
modules/<feature>/
├── components/    # Feature-specific components
├── pages/         # Page components (route targets)
└── utils/         # Feature-specific utilities
```

### State Management

- **Zustand** is used for global state management
- Stores are located in `src/shared/store/`
- Each store follows the pattern: `use<Feature>Store` (e.g., `useClientsStore`)
- Stores include mock data for development

### Routing

- Routes are defined in `App.tsx` using React Router v7
- URL constants are centralized in `src/shared/enums/UrlNames.ts`
- Protected routes use `ProtectedRoute` component for authentication guards

### Internationalization

- Supported languages: Russian (ru), English (en), Kyrgyz (kg)
- Translation files in `src/locales/`
- Use the `t()` function from `react-i18next` for translations

### UI Components

- **shadcn/ui** components are located in `src/components/ui/`
- Custom shared components in `src/shared/components/` (Layout, Sidebar, etc.)
- Use `cn()` utility from `@/lib/utils` for conditional class merging

## Key Files Reference

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite configuration with React and Tailwind plugins |
| `tsconfig.json` | TypeScript configuration with path aliases (`@/*`) |
| `components.json` | shadcn/ui configuration |
| `netlify.toml` | Netlify deployment redirects (SPA routing) |
| `src/main.tsx` | Application entry point with router and theme provider |
| `src/App.tsx` | Main routing configuration |
| `src/i18n.ts` | i18next configuration |
| `src/index.css` | Tailwind CSS with custom theme variables |

## Module Descriptions

| Module | Description |
|--------|-------------|
| `auth` | Login/authentication pages |
| `dashboard` | Main dashboard with owner/manager views |
| `clients` | Client management (CRUD, status filtering, search) |
| `products` | Product catalog management |
| `kanban` | Task/funnel management with drag-and-drop |
| `finances` | Financial data and reporting |
| `activity-logs` | System activity logging |
| `settings` | Application settings |
| `search` | Global search functionality |
| `prototype` | Prototype/testing pages |

## Notes

- The project uses **mock data** in Zustand stores (no real API integration yet)
- API layer exists but is currently empty (`src/shared/api/`)
- Theme support includes light/dark modes via `next-themes`
- The project is private (`"private": true` in package.json)
