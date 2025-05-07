# Fake Shop Frontend with Clerk Authentication

This is a fake shop starter project to use for other learning activities.

## Project Overview

This is a React-based e-commerce frontend application built with TypeScript, Vite, Redux Toolkit, and Clerk for authentication. The application features a responsive UI using TailwindCSS and follows modern React patterns.

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Clerk** - Authentication
- **TailwindCSS** - Styling
- **Shadcn** - Accessible UI components

## Project Structure

```
frontend/
├── public/             # Static assets
├── src/                # Source code
│   ├── components/     # Reusable UI components
│   │   └── ui/         # Base UI components
│   ├── lib/            # Types & Utility functions
│   ├── pages/          # Page components
│   │   ├── Home.tsx
│   │   ├── Shop.tsx
│   │   └── ProductDetail.tsx
│   ├── store/          # Redux store
│   │   ├── cartSlice.ts
│   │   ├── apiSlice.ts
│   │   └── index.ts
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Entry point
│   └── styles.css      # Global styles
├── .env.example        # Example environment variables
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and add your Clerk publishable key:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_publishable_key
   ```

### Development

Run the development server:

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

## Main Features

- User authentication with Clerk
- Product browsing
- Shopping cart functionality
- Responsive design

## Routes

- `/` - Home page
- `/shop` - Product listing page
- `/product/:id` - Product detail page
- `/categories` - Categories page (coming soon)
