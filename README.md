# 🎬 Moovees - Movie Discovery App

An elegant React application to browse the latest movies, discover popular titles, view ratings, and explore movie details.

Live Demo → [https://moovees.netlify.app](https://moovees.netlify.app)

## ✨ Features

- View detailed movie information (overview, cast, ratings, runtime, genres, release date, etc.)
- Responsive design — works great on mobile, tablet, and desktop
- Clean UI built with modern Tailwind CSS
- Fast development & build setup with Vite ⚡
- Search functionality

## 🛠️ Tech Stack

- **Frontend Framework**: React (with Hooks)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Language**: JavaScript / JSX
- **API**: The Movie Database (TMDB) API
- **Deployment**: Netlify
- **Code Quality**: ESLint

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm or pnpm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/AkhatorEnosa/movie-app.git

# Enter the project directory
cd movie-app

# Install dependencies
npm install
# or
pnpm install
# or
yarn install
```

### Environment Variables

Create a `.env` file in the root directory and add your TMDB API key:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
# Optional:
# VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
```

> Get your free API key → [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)

### Available Scripts

```bash
# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

```bash
# Run linter
npm run lint
```

Open [http://localhost:5173](http://localhost:5173) to see the app.

## 📁 Project Structure

```text
movie-app/
├── public/                → static assets (favicon, images, etc.)
├── src/
│   ├── assets/            → images, icons
│   ├── components/        → reusable UI components
│   ├── pages/             → main views (Home, MovieDetail, etc.)
│   ├── services/          → API calls (tmdb.js or similar)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## 🖼️ Screenshots

| Home Screen                          | Movie Detail Page                    | Mobile View                          |
|--------------------------------------|--------------------------------------|--------------------------------------|
| ![](https://res.cloudinary.com/dgmpx8acb/image/upload/v1772435947/Screenshot_2026-03-02_at_08.17.52_gmhlgj.png) | ![](https://res.cloudinary.com/dgmpx8acb/image/upload/v1772435939/Screenshot_2026-03-02_at_08.18.16_ddzhoy.png) | ![](https://res.cloudinary.com/dgmpx8acb/image/upload/v1772436342/Screenshot_2026-03-02_at_08.25.23_fxlnw9.png) |


## 📄 License

MIT License

Feel free to use this project for learning, inspiration, or building your own version!

## 🙌 Acknowledgements

- [The Movie Database (TMDB)](https://www.themoviedb.org/)
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Netlify](https://www.netlify.com/)

---

⭐ If you find this project helpful, please give it a star!  
Made with ❤️ by [Osa Akhator](https://github.com/AkhatorEnosa)
