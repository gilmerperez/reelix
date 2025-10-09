# Reelix

## Project Summary

Reelix is a modern web app for discovering movies and TV shows using live data from the TMDB API. It offers a cinematic, intuitive experience for exploring new releases, top-rated titles, and detailed metadata including trailers, cast, directors, genres, and countries.

Addressing the common issues of cluttered interfaces and limited filtering on other platforms, Reelix provides a clean, responsive UI focused on discoverability and speed. Built with React and Vite, it features modular architecture, optimized API calls, and seamless client-side routing via React Router.

The desktop-first design ensures great presentation on larger screens with full responsiveness for mobile. A dark theme with red highlights delivers a consistent, immersive look. Regional auto-language detection supports Spanish, French, Portuguese, and German, enhancing accessibility. Future plans include user accounts, watchlists, and ratings.

## Table of Contents

- [Mock-Up](#mock-up)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)

## Mock-Up

The following image shows the web application's appearance and functionality:

![Home Page](./src/assets/screenshots/home.jpg)

![Movies Page](./src/assets/screenshots/movies.jpg)

![TV Shows Page](./src/assets/screenshots/tv-shows.jpg)

![Top IMDB Page](./src/assets/screenshots/top-imdb.jpg)

## Key Features

- **Responsive Filters:** Users can filter by genre, year, and country.

- **Vite-Powered Performance:** Fast development server, optimized build, and preview commands.

- **Pagination Support:** Custom-styled pagination allows users to navigate through large result sets.

- **Multilingual Auto-Translation:** Supports German, Spanish, Portuguese, and French based on region settings.

- **Detailed Media Pages:** Each movie or show has a full page with poster, trailer, cast, crew, genres, and more.

- **Dynamic Movie & TV Data:** Fetches and renders media info using the TMDB API, including metadata and trailers.

- **Modular Architecture:** Reusable components like MediaDetail, MediaBanner, and Filter keep the code maintainable.

- **Dark UI with Red Accents:** Consistent, cinematic design styled with CSS Modules and a clean component architecture.

## Technology Stack

- **Node.js + npm:** Dependency and script management.

- **React:** Core library for building the user interface using components.

- **dotenv:** Used to load environment variables like the API key and port.

- **CSS Modules:** Provides scoped, maintainable styling for each component.

- **React Router DOM:** Handles dynamic routing for detail pages and filters.

- **Vite:** Fast bundler and dev server optimized for modern JavaScript projects.

- **TMDB API:** Source for real-time media data including metadata, images, and videos.

- **Render:** Used for deploying the app as a web service with dynamic port configuration.
