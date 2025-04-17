# Todo App

A simple Todo app built with Next.js (App Router), TypeScript, Tailwind CSS, and React Query. It fetches todos from the JSONPlaceholder API, allows adding, deleting, and toggling todos, and persists changes across page refreshes using `localStorage`. The app follows Feature-Sliced Design (FSD) for a modular architecture and includes a polished UI with animations and responsive design.

## Live Demo

[Try it now →](https://todo-app-test-task-ten.vercel.app/)

## Features

- Fetch and display todos from JSONPlaceholder API
- Add new todos (with validation for titles ≥ 3 characters)
- Delete todos (persists deletion across refreshes)
- Toggle todo completion (persists state across refreshes)
- Optimistic UI updates with React Query
- Client-side persistence using `localStorage` for added, deleted, and toggled todos
- Unique IDs for new todos using `uuid`
- Responsive design with Tailwind CSS
- Smooth animations (fade-in on add, fade-out on delete)
- Hover effects (e.g., checkbox scaling, title color change)
- Text wrapping for long todo titles
- Modular UI components (`TodoForm`, `TodoListItems`, `TodoItem`) for maintainability
- Basic error handling and loading states

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS (with custom animations)
- React Query (for data fetching and state management)
- Axios (for API requests)
- uuid (for generating unique IDs)
- JSONPlaceholder API (mock backend)

  ## Architecture

The app follows the Feature-Sliced Design (FSD) architecture, which promotes modularity and separation of concerns:

- app/ → Routing and global providers
- features/ → Business logic (e.g., todos feature)
- entities/ → Data models (e.g., Todo entity)
- shared/ → Reusable utilities (e.g., API client, localStorage helpers)

  Each layer has a specific role and encourages scalable project structure as the app grows.

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

## Getting Started

To run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/todo-app.git
   cd todo-app

   2. Install dependencies:
   ```bash
   npm install

3. Start the development server:
   ```bash
   npm run dev
   
4. Open your browser and go to http://localhost:3000
