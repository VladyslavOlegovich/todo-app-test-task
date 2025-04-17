<!-- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->

📝 Todo App

A clean and minimalistic Todo App built with Next.js, React Query, Tailwind CSS, and TypeScript.
It uses the JSONPlaceholder API, supports optimistic updates, animations, and data persistence in localStorage.

🚀 Try it now →

✨ Features
✅ Fetch todos from JSONPlaceholder API

➕ Add todos (title ≥ 3 characters)

❌ Delete todos

🔁 Toggle completion status

⚡ Optimistic UI updates with React Query

💾 Persists all changes in localStorage

🆔 Unique IDs with uuid

📱 Responsive layout (Tailwind CSS)

🎞 Smooth fade animations on add/delete

🖱 Nice hover effects (scaling, color transitions)

✍️ Handles long text gracefully

🧩 Modular components (TodoForm, TodoItem, TodoListItems)

🛡 Basic loading and error states

📂 Project Structure
Following Feature-Sliced Design (FSD):

src/
├── app/ → Routing & global providers
├── features/ → Business logic (e.g. todos feature)
├── entities/ → Data models (e.g. Todo)
├── shared/ → Reusable utils (e.g. API client, localStorage helpers)

🧱 Tech Stack
Next.js (App Router)

React Query

TypeScript

Tailwind CSS

Axios

uuid

JSONPlaceholder API

🛠 Getting Started

1. Clone the repo
   git clone https://github.com/your-username/todo-app.git
   cd todo-app
2. Install dependencies
   npm install
3. Run the dev server
   npm run dev
4. Open your browser
   http://localhost:3000
