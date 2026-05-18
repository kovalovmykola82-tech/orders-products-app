# Orders & Products App

SPA application for managing orders and products.

The project was implemented as a test task and demonstrates a fullstack React/Next.js application with authentication, database integration, REST API, global state management, WebSocket counter, Docker setup, unit tests, i18n, lazy loading and charts.

## Live Demo

Live demo: will be added after deployment.

## Test Account

Use this account to log in after running seed:

```txt
Email: admin@example.com
Password: password123
```

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Redux Toolkit
- RTK Query
- Prisma ORM
- MySQL
- JWT authentication
- Socket.io
- Bootstrap
- SCSS / BEM-style class naming
- Recharts
- Vitest
- Docker / Docker Compose

## Features

### Authentication

- JWT-based login
- Basic registration endpoint
- Protected routes
- Client auth state with Redux
- Access token stored in Web Storage
- Logout flow

### Orders

- Orders list
- Order title
- Products count
- Created date formats
- Total order price by currencies
- Compact mode when order details are opened
- Order details panel
- Products inside selected order
- Delete order modal
- Delete order with API mutation

### Products

- Products list
- Filter by product type
- Product title, type and specification
- Guarantee dates
- Prices in different currencies
- Related order title
- Long text truncation with native tooltip
- Products statistics chart by type

### Top Menu

- Current date
- Real-time clock
- Active browser sessions counter via Socket.io
- RU / UK language switcher

### i18n

Basic client-side i18n is implemented for Russian and Ukrainian.

The selected locale is stored in localStorage.

### Lazy Loading

Lazy loading is used for secondary components:

- Products chart
- Order details panel
- Delete order modal

### Charts

The products page includes a chart that shows product count grouped by product type.

### WebSocket

Socket.io is used to show active browser sessions in real time.

Each opened browser tab creates a socket connection. When a tab is closed, the counter is updated.

### Maps

Maps were not implemented because the provided Orders & Products domain model does not contain location-related data such as addresses, warehouses or coordinates.

## Project Structure

```txt
src/
  app/
    api/
      auth/
      orders/
      products/
    login/
    orders/
    products/
  components/
    auth/
    layout/
    orders/
    products/
  hooks/
  i18n/
  lib/
  store/
  styles/

prisma/
  schema.prisma
  seed.ts

database/
  schema.sql
```

## Database

The application uses MySQL and Prisma.

Main entities:

- User
- Order
- Product
- Price

Relations:

```txt
Order 1 -> many Products
Product 1 -> many Prices
```

The SQL database schema is available here:

```txt
database/schema.sql
```

This file can be opened and executed in MySQL Workbench.

The runtime database schema is managed by Prisma:

```txt
prisma/schema.prisma
```

## Environment Variables

Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

Default local `.env` values:

```env
DATABASE_URL="mysql://app_user:app_password@localhost:3307/orders_products_db"

JWT_SECRET="replace_with_secure_secret"
JWT_EXPIRES_IN="1d"

NEXT_PUBLIC_APP_NAME="Orders Products App"
```

For local development, Docker exposes MySQL on port `3307`.

Inside Docker Compose, the app connects to MySQL by service name:

```txt
mysql:3306
```

## Prerequisites

Before running the project locally, make sure you have installed:

- Node.js 22+
- npm
- Docker Desktop
- Git

## Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Start MySQL

```bash
docker compose up -d mysql
```

### 3. Generate Prisma Client

```bash
npm run db:generate
```

### 4. Push database schema

```bash
npm run db:push
```

### 5. Seed database

```bash
npm run db:seed
```

### 6. Start development server

```bash
npm run dev
```

Application will be available at:

```txt
http://localhost:3000
```

## Docker Run

The project can be started with Docker Compose:

```bash
docker compose up --build
```

This starts:

- Next.js app with custom server
- MySQL
- Adminer

Application:

```txt
http://localhost:3000
```

Adminer:

```txt
http://localhost:8081
```

Adminer credentials:

```txt
System: MySQL
Server: mysql
Username: app_user
Password: app_password
Database: orders_products_db
```

To stop containers:

```bash
docker compose down
```

To remove containers and database volume:

```bash
docker compose down -v
```

## Available Scripts

```bash
npm run dev
```

Starts the custom Next.js server with Socket.io in development mode.

```bash
npm run build
```

Builds the Next.js application.

```bash
npm run start
```

Starts the production server.

```bash
npm run lint
```

Runs ESLint.

```bash
npm run test
```

Runs unit tests with Vitest.

```bash
npm run format
```

Formats the project with Prettier.

```bash
npm run db:generate
```

Generates Prisma Client.

```bash
npm run db:push
```

Pushes Prisma schema to the database.

```bash
npm run db:seed
```

Seeds the database with test data.

```bash
npm run db:studio
```

Opens Prisma Studio.

## API Endpoints

### Auth

```txt
POST /api/auth/login
POST /api/auth/register
```

Login body:

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

### Orders

```txt
GET /api/orders
GET /api/orders/:id
DELETE /api/orders/:id
```

### Products

```txt
GET /api/products
GET /api/products?type=Monitors
```

## WebSocket Check

To check active sessions counter:

1. Run the app.
2. Log in.
3. Open `/orders` or `/products`.
4. Open the app in another browser tab.
5. The active sessions counter in the top menu should increase.
6. Close one tab.
7. The counter should decrease.

## Testing

Run unit tests:

```bash
npm run test
```

Covered areas:

- Date formatting utilities
- Currency totals calculation
- Auth Redux slice

## Deployment Notes

The project uses a custom Next.js server with Socket.io.

Because of that, the app should be deployed to a Node.js hosting platform that supports long-running server processes and WebSocket connections, for example:

- Render
- Railway
- Fly.io
- VPS / VDS

Vercel is not the best fit for this implementation because the project uses a custom server for Socket.io.

## Implementation Notes

### Prisma version

The project uses Prisma 6 for a stable and predictable setup.

### Docker install command

The Dockerfile uses `npm install` during image build.

`npm ci` is usually preferred for CI/Docker, but in this project it caused a lock-file conflict with a transitive dependency during Docker build. For this test task, `npm install` was used to keep the Docker startup stable and reproducible for review.

### JWT storage

The access token is stored in localStorage to demonstrate Web Storage usage required by the task.

For production systems, a more secure approach would be:

```txt
refresh token -> httpOnly cookie
access token -> memory
```

## Completed Requirements

- React.js
- TypeScript
- Next.js
- Redux Toolkit
- RTK Query
- Routing
- REST API
- JWT
- Web Storage
- Socket.io active sessions counter
- Docker
- MySQL database
- Prisma ORM
- Database schema file
- Bootstrap
- SCSS / BEM-style CSS structure
- Unit tests
- i18n RU / UK
- Lazy Loading
- Charts
- Git commit history