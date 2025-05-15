# WorkTide

WorkTide is a full-stack freelance platform application built with modern web technologies. It consists of a NestJS backend and a React frontend.

## Project Structure

- `/WorkTide/backend`: NestJS API with PostgreSQL database (Prisma ORM)
- `/WorkTide/frontend`: React + TypeScript + Vite frontend

## Prerequisites

- Node.js (latest LTS version recommended)
- npm (comes with Node.js)
- PostgreSQL database

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd WorkTide
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create a .env file with your database connection string
echo "DATABASE_URL=\"postgresql://username:password@localhost:5432/worktide\"" > .env
# If .env file already exists, simply edit it

# Run Prisma migrations to create database schema
npx prisma migrate dev --name init

# Start the development server
npm run start:dev
```

The backend will run on http://localhost:3000 by default.

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on http://localhost:5173 by default.

## Features

- User authentication (freelancers and clients)
- User profiles with skills, education, and experience
- Project management
- And more...

## Development

### Backend

```bash
# Start in development mode
npm run start:dev

# Build for production
npm run build

# Run in production mode
npm run start:prod

# Run tests
npm run test
```

### Frontend

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

### Backend (.env)

```
DATABASE_URL="postgresql://username:password@localhost:5432/worktide"
JWT_SECRET="your-secret-key"  # For authentication (if implemented)
```

## Technologies Used

### Backend
- NestJS
- Prisma ORM
- PostgreSQL
- Passport & JWT for authentication

### Frontend
- React 19
- TypeScript
- Vite
- TailwindCSS
- React Router
- i18next for internationalization