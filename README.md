# 🎬 Movie Mingle

A modern, elegant movie discovery platform built with Next.js 13, featuring a cinematic UI, personalized recommendations, and social features.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- 🎭 **Cinematic UI**: Modern, elegant design with smooth animations and transitions
- 🔐 **Secure Authentication**: NextAuth.js with Google OAuth
- 🎬 **Movie Discovery**: Browse popular, trending, top-rated movies
- 🔍 **Advanced Search**: Find movies, actors, and TV shows
- ⭐ **Watchlist**: Save and organize your favorite movies
- 🎭 **Actor Profiles**: Explore actor filmographies
- 📱 **Fully Responsive**: Optimized for all devices
- ⚡ **Lightning Fast**: Server-side rendering with Next.js App Router
- 🎨 **Dark Theme**: Eye-friendly cinematic dark mode

## 🚀 Tech Stack

### Core
- **Framework**: [Next.js 13.5+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)

### Backend & Database
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: MySQL (PlanetScale recommended)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)

### Data & State
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **API**: [TMDB API](https://www.themoviedb.org/documentation/api)
- **Validation**: [Zod](https://zod.dev/)

### Developer Experience
- **Linting**: ESLint (Strict)
- **Formatting**: Prettier
- **Type Safety**: TypeScript Strict Mode
- **Environment Validation**: @t3-oss/env-core

## 📋 Prerequisites

- **Node.js**: 24.0.0 or higher
- **Package Manager**: npm, yarn, or pnpm
- **Database**: MySQL compatible (PlanetScale, Railway, etc.)
- **TMDB API Key**: [Get one here](https://www.themoviedb.org/settings/api)
- **Google OAuth Credentials**: [Get from Google Cloud Console](https://console.cloud.google.com/)

## 🛠️ Getting Started

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/yourusername/movie-mingle.git
cd movie-mingle
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

### 3. Setup Environment Variables

Create a \`.env.local\` file in the root directory:

\`\`\`env
# Database (PlanetScale, Vercel Postgres, or MySQL)
DATABASE_URL="mysql://user:password@host:3306/movie_mingle"

# TMDB API Key
# Get yours at: https://www.themoviedb.org/settings/api
TMDB_API_KEY="your_tmdb_api_key_here"

# NextAuth Configuration
# Generate secret with: openssl rand -base64 32
NEXTAUTH_SECRET="your_32_character_or_longer_secret_here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth Credentials
# Get yours at: https://console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Public Variables
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Development
NODE_ENV="development"
\`\`\`

### 4. Setup Database

\`\`\`bash
# Generate Prisma Client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# Or run migrations
npm run prisma:migrate
\`\`\`

### 5. Run Development Server

\`\`\`bash
npm run dev
# or with Turbopack (faster)
npm run turbo
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

\`\`\`bash
# Development
npm run dev              # Start development server
npm run turbo           # Start with Turbopack (faster)

# Building
npm run build           # Build for production
npm run start           # Start production server
npm run preview         # Build and start production server

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint errors
npm run format          # Format code with Prettier
npm run format:check    # Check formatting
npm run type-check      # Check TypeScript types

# Database
npm run prisma:studio   # Open Prisma Studio
npm run prisma:generate # Generate Prisma Client
npm run prisma:migrate  # Run migrations
npm run prisma:push     # Push schema to database
\`\`\`

## 🏗️ Project Structure

\`\`\`
movie-mingle/
├── app/                          # Next.js App Router
│   ├── (dashboard)/             # Dashboard routes (protected)
│   │   └── dashboard/           # User dashboard pages
│   ├── (tmdb)/                  # TMDB-related routes
│   │   ├── actors/              # Actor pages
│   │   ├── movies/              # Movie pages
│   │   └── search/              # Search functionality
│   ├── api/                     # API routes
│   │   ├── auth/                # NextAuth endpoints
│   │   ├── movies/              # Movie API endpoints
│   │   ├── actors/              # Actor API endpoints
│   │   └── search/              # Search API endpoint
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   ├── loading.tsx              # Global loading state
│   ├── error.tsx                # Global error boundary
│   └── not-found.tsx            # 404 page
├── components/                   # React components
│   ├── Cards/                   # Card components
│   ├── Icon/                    # Icon components
│   ├── Layout/                  # Layout components
│   ├── Swiper/                  # Swiper components
│   └── ui/                      # UI primitives
├── config/                      # Configuration files
├── context/                     # React contexts
├── hooks/                       # Custom hooks
├── lib/                         # Utility libraries
│   ├── auth.ts                  # NextAuth configuration
│   ├── db.ts                    # Prisma client
│   ├── session.ts               # Session utilities
│   └── utils.ts                 # Helper functions
├── prisma/                      # Prisma schema & migrations
│   └── schema.prisma            # Database schema
├── public/                      # Static assets
├── styles/                      # Global styles
│   └── globals.css              # Tailwind & custom CSS
├── types/                       # TypeScript types
│   ├── index.d.ts               # Global types
│   ├── next-auth.d.ts           # NextAuth types
│   └── tmdb/                    # TMDB API types
├── utils/                       # Utility functions
├── env.mjs                      # Environment validation
├── middleware.ts                # Next.js middleware (auth)
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind configuration
└── tsconfig.json                # TypeScript configuration
\`\`\`

## 🎨 Design System

### Colors

- **Primary**: Golden Yellow (\`#FDBB30\`) - Accent color inspired by movie awards
- **Background**: Deep Dark (\`#030e13\`) - Cinematic dark background
- **Text**: Light Gray to White - High contrast for readability

### Typography

- **Font**: Inter - Clean, modern, highly readable

### Components

- **Buttons**: Rounded, with glow effects on hover
- **Cards**: Elegant hover animations with scale and shadow effects
- **Modals**: Glass morphism with backdrop blur

## 🔐 Security Features

- ✅ **NextAuth.js**: Secure authentication
- ✅ **Security Headers**: CSP, X-Frame-Options, etc.
- ✅ **Input Validation**: Zod schemas on all API routes
- ✅ **Environment Validation**: Type-safe environment variables
- ✅ **HTTPS Only**: Strict-Transport-Security headers
- ✅ **Protected Routes**: Middleware-based route protection

## 🚀 Performance Optimizations

- **Server Components**: Default to Server Components for better performance
- **Image Optimization**: Next.js Image with blur placeholders
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: API response caching with ISR
- **Modern Formats**: AVIF and WebP image formats

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature/amazing-feature\`
3. Commit your changes: \`git commit -m 'Add amazing feature'\`
4. Push to the branch: \`git push origin feature/amazing-feature\`
5. Open a Pull Request

### Code Style

- Follow the existing code style
- Run \`npm run lint:fix\` before committing
- Run \`npm run format\` to format code
- Ensure \`npm run type-check\` passes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for the amazing movie database API
- [Next.js](https://nextjs.org/) team for the incredible framework
- [Vercel](https://vercel.com/) for hosting and deployment
- All open-source contributors

## 📧 Contact

- **Author**: Your Name
- **Email**: your.email@example.com
- **GitHub**: [@yourusername](https://github.com/yourusername)

---

**⭐ If you like this project, please give it a star!**
