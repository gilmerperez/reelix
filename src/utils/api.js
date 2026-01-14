const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// * Cache genre maps to avoid repeated fetches
const genreCache = {
  movie: null,
  tv: null,
};

// * Main unified fetch function with filtering and enrichment
export async function fetchFilteredContent(
  type = "movie",
  { page = 1, year = "", genre = "", country = "" } = {},
  resultsPerPage = 52
) {
  const totalPagesNeeded = Math.ceil(resultsPerPage / 20);
  const genreMap = await fetchGenreMap(type);

  let results = [];
  let totalResults = 0;

  // * Fetch filtered content
  for (let i = 0; i < totalPagesNeeded; i++) {
    // Calculate API page
    const apiPage = (page - 1) * totalPagesNeeded + i + 1;
    // Build URL
    let url = `${BASE_URL}/discover/${type}?api_key=${API_KEY}&language=en-US&page=${apiPage}&sort_by=popularity.desc`;
    // Add year filter
    if (year) url += `&${type === "movie" ? "primary_release_year" : "first_air_date_year"}=${year}`;
    // Add genre filter
    if (genre) url += `&with_genres=${genre}`;
    // Add country filter
    if (country) url += `&region=${country}`; // For release region
    // Try to fetch data
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch ${type} page ${apiPage}`);
      const json = await response.json();
      // If first page, set total results
      if (i === 0) totalResults = json.total_results;
      results.push(...json.results);
    } catch (err) {
      console.error(`Error fetching page ${apiPage}:`, err);
    }
  }

  // * Enrich data with additional details
  const enriched = await Promise.all(
    results.slice(0, resultsPerPage).map(async (item) => {
      // Try to enrich data
      try {
        if (type === "movie") {
          const { runtime, certification } = await fetchMovieDetails(item.id);
          return {
            ...item,
            runtime,
            certification,
            genre_names: item.genre_ids.map((id) => genreMap[id] || "Unknown"),
          };
          // If successful, return enriched data
        } else {
          const { number_of_seasons, first_air_date } = await fetchTVDetails(item.id);
          return {
            ...item,
            number_of_seasons,
            first_air_date,
            genre_names: item.genre_ids.map((id) => genreMap[id] || "Unknown"),
          };
        }
        // If failed, return original data
      } catch (err) {
        console.warn(`Failed to enrich ${type} ID ${item.id}`, err);
        return { ...item };
      }
    })
  );
  // If successful, return results and total results
  return { results: enriched, totalResults };
}

// * Genre map fetcher with caching by type
async function fetchGenreMap(type = "movie") {
  // If genre cache exists, return it
  if (genreCache[type]) return genreCache[type];
  // Try to fetch genre map
  try {
    const res = await fetch(`${BASE_URL}/genre/${type}/list?api_key=${API_KEY}&language=en-US`);
    if (!res.ok) throw new Error(`Failed to fetch genre list for ${type}`);
    const data = await res.json();
    // Create map
    const map = {};
    for (const genre of data.genres) {
      map[genre.id] = genre.name;
    }
    // Set genre cache
    genreCache[type] = map;
    return map;
  } catch (err) {
    console.error(`Genre map fetch error:`, err);
    return {};
  }
}

// * Movies fetch and enrich
export async function fetchMovies({ page = 1, year = "", genre = "", country = "" } = {}) {
  // Build URL
  let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}&sort_by=popularity.desc`;
  // Add year filter
  if (year) url += `&primary_release_year=${year}`;
  // Add genre filter
  if (genre) url += `&with_genres=${genre}`;
  // Add country filter
  if (country) url += `&region=${country}`;

  // Try to fetch data
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch movies");
    const json = await response.json();
    const genreMap = await fetchGenreMap("movie");

    // Enrich data with additional details
    return await Promise.all(
      json.results.map(async (movie) => {
        const { runtime, certification } = await fetchMovieDetails(movie.id);
        return {
          ...movie,
          runtime,
          certification,
          genre_names: movie.genre_ids.map((id) => genreMap[id] || "Unknown"),
        };
      })
    );
  } catch (err) {
    console.error("fetchMovies error:", err);
    return [];
  }
}

// * Movie search
export async function searchMovies(query) {
  // If query is empty, return empty array
  if (!query) return [];

  // Try to fetch data
  try {
    const res = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
        query
      )}&include_adult=false`
    );
    // If failed, throw error
    if (!res.ok) throw new Error("Movie search failed");
    const json = await res.json();
    const genreMap = await fetchGenreMap("movie");

    // Enrich data with additional details
    return await Promise.all(
      json.results.map(async (movie) => {
        const { runtime, certification } = await fetchMovieDetails(movie.id);
        return {
          ...movie,
          runtime,
          certification,
          genre_names: movie.genre_ids.map((id) => genreMap[id] || "Unknown"),
        };
      })
    );
  } catch (err) {
    console.error("searchMovies error:", err);
    return [];
  }
}

// * Movie details
async function fetchMovieDetails(id) {
  // Try to fetch data
  try {
    const [detailsRes, ratingsRes] = await Promise.all([
      fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`),
      fetch(`${BASE_URL}/movie/${id}/release_dates?api_key=${API_KEY}`),
    ]);

    // Get details and ratings
    const details = await detailsRes.json();
    const ratings = await ratingsRes.json();

    // Get US release and certification
    const usRelease = ratings.results.find((r) => r.iso_3166_1 === "US");
    const certification = usRelease?.release_dates?.[0]?.certification || "NR";

    return { runtime: details.runtime, certification };
  } catch (err) {
    console.warn(`fetchMovieDetails failed for ID ${id}`, err);
    return { runtime: 0, certification: "NR" };
  }
}

// * Movie genres
export async function fetchMovieGenres() {
  return await fetchGenreMap("movie");
}

// * TV Show fetch and enrich
export async function fetchTVShows(page = 1) {
  // Try to fetch data
  try {
    const res = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
    if (!res.ok) throw new Error("Failed to fetch TV shows");
    const json = await res.json();
    const genreMap = await fetchGenreMap("tv");

    // Enrich data with additional details
    return await Promise.all(
      json.results.map(async (show) => {
        const details = await fetchTVDetails(show.id);
        return {
          ...show,
          ...details,
          genre_names: show.genre_ids.map((id) => genreMap[id] || "Unknown"),
        };
      })
    );
  } catch (err) {
    console.error("fetchTVShows error:", err);
    return [];
  }
}

// * TV Show search
export async function searchTVShows(query) {
  // If query is empty, return empty array
  if (!query) return [];

  // Try to fetch data
  try {
    const res = await fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&include_adult=false`
    );
    // If failed, throw error
    if (!res.ok) throw new Error("Failed to fetch TV shows");
    const json = await res.json();
    const genreMap = await fetchGenreMap("tv");

    // Enrich data with additional details
    return await Promise.all(
      json.results.map(async (tvShow) => {
        const { episode_run_time } = await fetchTVShowDetails(tvShow.id);
        return {
          ...tvShow,
          runtime: episode_run_time?.[0] || 0,
          genre_names: tvShow.genre_ids.map((id) => genreMap[id] || "Unknown"),
        };
      })
    );
  } catch (err) {
    console.error("searchTVShows error:", err);
    return [];
  }
}

// * TV Show details
async function fetchTVDetails(id) {
  // Try to fetch data
  const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US`);
  // If failed, throw error
  if (!res.ok) throw new Error("Failed to fetch TV details");
  const data = await res.json();
  // Return number of seasons and first air date
  return {
    number_of_seasons: data.number_of_seasons,
    first_air_date: data.first_air_date,
  };
}

// * TV Show details
async function fetchTVShowDetails(id) {
  // Try to fetch data
  const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US`);
  const data = await res.json();

  return {
    episode_run_time: data.episode_run_time || [],
  };
}

// * TV Show genres
export async function fetchTVGenres() {
  return await fetchGenreMap("tv");
}

// * Top IMDB fetch and enrich
export async function fetchTopRatedMovies(page = 1, signal) {
  // Build URL
  const url = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;

  // Try to fetch data
  try {
    const res = await fetch(url, { signal });
    // If failed, throw error
    if (!res.ok) throw new Error("Failed to fetch top rated movies");
    // Get data
    const data = await res.json();

    // Enrich data with additional details
    const enrichedResults = await Promise.all(
      data.results.map(async (movie) => {
        try {
          const detailRes = await fetch(
            `${BASE_URL}/movie/${movie.id}?api_key=${API_KEY}&language=en-US&append_to_response=release_dates`,
            { signal }
          );
          const details = await detailRes.json();

          const certification =
            details.release_dates?.results?.find((r) => r.iso_3166_1 === "US")?.release_dates?.[0]?.certification ||
            "N/A";

          return {
            ...movie,
            runtime: details.runtime,
            genre_names: details.genres.map((g) => g.name),
            certification,
          };
        } catch (err) {
          console.warn(`Top-rated enrichment failed for ID ${movie.id}`, err);
          return { ...movie, runtime: 0, genre_names: [], certification: "N/A" };
        }
      })
    );
    // Return results and total results
    return {
      results: enrichedResults,
      totalResults: data.total_results,
    };
    // If failed, return empty results and total results
  } catch (err) {
    console.error("fetchTopRatedMovies error:", err);
    return { results: [], totalResults: 0 };
  }
}

// * In-Depth media details for Movies and TV Shows
export async function fetchMediaDetails(type = "movie", id) {
  // Try to fetch data
  try {
    const [detailRes, creditsRes, videosRes] = await Promise.all([
      fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=en-US`),
      fetch(`${BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}&language=en-US`),
      fetch(`${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}&language=en-US`),
    ]);

    // Get details, credits, and videos
    const details = await detailRes.json();
    const credits = await creditsRes.json();
    const videos = await videosRes.json();

    // Get trailer, cast, directors, and producers
    const trailer = videos.results.find((vid) => vid.type === "Trailer" && vid.site === "YouTube");
    const cast = credits.cast.slice(0, 6).map((member) => member.name);
    const directors = credits.crew.filter((m) => m.job === "Director").map((p) => p.name);
    const producers = credits.crew.filter((m) => m.job === "Producer").map((p) => p.name);

    // Return details
    return {
      id: details.id,
      title: details.title || details.name,
      overview: details.overview,
      vote_average: details.vote_average,
      vote_count: details.vote_count,
      release_date: details.release_date || details.first_air_date,
      runtime: details.runtime || details.episode_run_time?.[0] || null,
      number_of_seasons: details.number_of_seasons || null,
      genres: details.genres.map((g) => g.name),
      country: details.production_countries?.[0]?.name || "Unknown",
      poster_path: details.poster_path,
      backdrop_path: details.backdrop_path,
      trailer_key: trailer?.key || null,
      trailer_link: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null,
      cast,
      directors,
      producers,
    };
    // If failed, return null
  } catch (err) {
    console.error(`fetchMediaDetails failed for ID ${id}`, err);
    return null;
  }
}
