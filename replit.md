# replit.md

## Overview

This is a full-stack web application built with a React frontend and Express.js backend. The application features a modern dashboard interface with admin functionality for managing users, products, and orders. It uses TypeScript throughout the stack and implements a clean architecture with shared types and schemas.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite for development and production builds
- **State Management**: React Query (@tanstack/react-query) for server state management
- **Routing**: Wouter for client-side routing
- **UI Components**: Radix UI primitives with custom styling
- **Charts**: Recharts for data visualization

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **API**: RESTful API with JSON responses
- **Error Handling**: Centralized error handling middleware
- **Development**: Hot reloading with tsx

### Storage Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **Migrations**: Drizzle Kit for schema management
- **Fallback**: In-memory storage implementation for development

## Key Components

### Database Schema
- **Users**: Authentication and user management with roles
- **Products**: Product catalog with inventory tracking
- **Orders**: Order management with customer relationships
- **Analytics**: Metrics and reporting data

### API Endpoints
- `/api/dashboard/stats` - Dashboard statistics
- `/api/users` - User CRUD operations
- `/api/products` - Product management
- `/api/orders` - Order management
- `/api/analytics` - Analytics data

### Frontend Features
- **Dashboard**: Overview with stats, charts, and recent activity
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Component Library**: Comprehensive UI components following design system
- **Data Visualization**: Revenue trends and activity charts
- **Search & Filtering**: Real-time search across data tables

## Data Flow

1. **Client Requests**: React components use React Query to fetch data
2. **API Layer**: Express routes handle requests and validation
3. **Data Layer**: Drizzle ORM manages database operations
4. **Response**: JSON responses with proper error handling
5. **Client Updates**: React Query manages cache and re-fetching

## External Dependencies

### Production Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for Neon
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight routing
- **zod**: Runtime type validation
- **recharts**: Chart library

### Development Tools
- **Vite**: Build tool and dev server
- **TypeScript**: Type checking and compilation
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Development
- **Command**: `npm run dev`
- **Features**: Hot reloading, Vite dev server, TypeScript checking
- **Database**: Requires DATABASE_URL environment variable

### Production Build
- **Frontend**: `vite build` outputs to `dist/public`
- **Backend**: `esbuild` bundles server to `dist/index.js`
- **Start**: `npm start` runs production server

### Environment Requirements
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Set to "production" for production builds
- **Port**: Configurable via environment or defaults

## Changelog

```
Changelog:
- July 08, 2025. Initial setup
- July 08, 2025. Migration from Replit Agent to Replit completed - Fixed Button import and mobile state management issues
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
Design requirements: OpenCart-style admin dashboard with comprehensive navigation menu system.
Navigation structure: Multi-level menu with expandable sub-menus for Journal, Catalog, Product Import, Extensions, Design, Sales, Customers, Marketing, System, and Reports.
```