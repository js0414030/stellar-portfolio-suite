# My Portfolio Website

Hey there! 👋 This is my personal portfolio website where I showcase my projects and skills. Built with modern web tech to be fast, responsive, and fun to use.

## What's Inside

- Built with React + TypeScript
- Styled with Tailwind CSS and shadcn/ui
- Dark/light mode support
- Super fast thanks to Vite
- Responsive design that works everywhere

## Getting Started

First, clone the repo and install the deps:

```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
npm install
```

### Environment Setup

Create a `.env` file in the root with your Supabase details:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-key-here
```

Then start the dev server:

```bash
npm run dev
```

## Project Structure

```
src/
├── components/  # Reusable UI components
├── pages/      # Page components
├── lib/        # Utilities and config
└── styles/     # Global styles
```

## Available Scripts

- `npm run dev` - Start dev server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run linter

## Deployment

Easiest way is to deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/portfolio)

Or Netlify:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/portfolio)

## License

MIT
