# IT Asset Buyback Manager

## Overview

The IT Asset Buyback Manager is a web application designed to streamline the tracking and management of IT assets through the buyback process. The system enables IT teams to create asset records, generate QR codes for physical asset tracking, and monitor assets through various buyback statuses (Pending, Approved, In Process, Completed). The application focuses on data clarity, efficient form workflows, and mobile-responsive design to support field scanning scenarios.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite as the build tool and development server.

**Routing**: Client-side routing implemented with `wouter`, a lightweight routing library. The application has two main routes:
- `/` - Home page with asset creation form
- `/dashboard` - Dashboard view for managing and viewing all assets

**State Management**: 
- React Query (`@tanstack/react-query`) handles server state, data fetching, and cache management
- Local component state managed with React hooks (useState, useEffect)
- Form state managed by React Hook Form with Zod validation

**UI Component Library**: shadcn/ui components built on Radix UI primitives, following the "New York" style variant. The design system emphasizes:
- Material Design adaptation for utility-focused workflows
- Tailwind CSS for styling with custom design tokens
- Inter font family for optimal readability in data-dense interfaces
- Consistent spacing scale and component hierarchy

**Key UI Patterns**:
- Card-based layouts for containing related information
- Table-based dashboard for asset listing with search and filter capabilities
- Modal dialogs for QR code display
- Toast notifications for user feedback
- Form validation with real-time error messages

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript.

**API Design**: RESTful API with JSON payloads:
- `GET /api/assets` - Retrieve all assets
- `POST /api/assets` - Create new asset
- `DELETE /api/assets/:id` - Delete specific asset

**Request Processing**:
- JSON body parsing with Express middleware
- Zod schema validation for incoming data
- Error handling with appropriate HTTP status codes

**Development Server**: Vite middleware integrated with Express for hot module replacement during development.

### Data Storage Solutions

**Current Implementation**: In-memory storage using a Map-based data structure (`MemStorage` class). This approach:
- Provides fast read/write operations
- Suitable for development and testing
- Data does not persist between server restarts
- Uses UUID for asset identification

**Database Schema Design**: PostgreSQL schema defined using Drizzle ORM:
- Single `assets` table with fields: id (UUID primary key), pcName, employeeNumber, username, serialNumber, macAddress, buybackStatus, date, createdAt
- Schema supports migration to PostgreSQL when database is provisioned
- Drizzle configuration ready for PostgreSQL dialect

**Data Validation**: Shared validation schemas using Zod ensure consistency between frontend and backend. MAC address format validated with regex pattern, and buyback status constrained to enum values.

### Authentication and Authorization

**Current State**: No authentication or authorization implemented. The application is designed for internal IT team use, assuming trusted network environment.

**Security Considerations**: All API endpoints are publicly accessible. Session management infrastructure (connect-pg-simple) is present in dependencies but not actively used.

### QR Code Generation

**Implementation**: Client-side QR code generation using the `qrcode` library. QR codes encode complete asset information as JSON strings including all asset fields.

**Features**:
- Canvas-based rendering for high-quality output
- Downloadable PNG format for printing and labeling
- 300px width with 2-pixel margin for optimal scanning

### Duplicate Detection

The dashboard implements client-side duplicate detection logic to identify assets with:
- Duplicate serial numbers
- Duplicate MAC addresses

This helps IT teams identify potential data entry errors or asset conflicts.

## External Dependencies

### Core Framework Dependencies
- **React 18**: Frontend UI library
- **Express.js**: Backend web server framework
- **TypeScript**: Type-safe development across frontend and backend
- **Vite**: Build tool and development server with HMR support

### UI Component Libraries
- **Radix UI**: Unstyled, accessible component primitives (accordion, dialog, dropdown, select, toast, etc.)
- **shadcn/ui**: Pre-built component implementations using Radix UI
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library (outline style icons)

### Data Management
- **Drizzle ORM**: TypeScript ORM for database operations and schema management
- **Drizzle Zod**: Integration between Drizzle schemas and Zod validation
- **@neondatabase/serverless**: PostgreSQL client for Neon database (configured but not actively used with in-memory storage)
- **Zod**: Runtime type validation and schema definition

### Form Handling
- **React Hook Form**: Form state management with performance optimization
- **@hookform/resolvers**: Validation resolver for Zod schemas

### State Management
- **@tanstack/react-query**: Asynchronous state management, caching, and data fetching

### QR Code Generation
- **qrcode**: QR code generation library for creating scannable asset labels

### Date Handling
- **date-fns**: Date utility library for formatting and manipulation
- **react-day-picker**: Calendar component for date selection

### Development Tools
- **@replit/vite-plugin-runtime-error-modal**: Error overlay for development
- **@replit/vite-plugin-cartographer**: Replit-specific development tooling
- **tsx**: TypeScript execution for development server

### Session Management (Configured but Inactive)
- **connect-pg-simple**: PostgreSQL session store for Express (present but not used in current implementation)

### Utility Libraries
- **class-variance-authority**: Utility for creating variant-based component styles
- **clsx**: Conditional className utility
- **cmdk**: Command palette component primitives
- **nanoid**: Unique ID generation
- **wouter**: Lightweight client-side routing
- **vaul**: Drawer component primitives