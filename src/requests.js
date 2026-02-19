const requests = {
    fetchTrending: `/trending`,
    fetchNetflixOriginals: `/netflix-originals`,
    fetchTopRated: `/top-rated`,
    fetchActionMovies: `/action`,
    fetchComedyMovies: `/comedy`,
    fetchHorrorMovies: `/horror`,
    fetchRomanceMovies: `/romance`,
    fetchDocumentaries: `/documentaries`,
    // TV Specific
    fetchTrendingTV: `/trending-tv`,
    fetchTopRatedTV: `/top-rated-tv`,
    fetchPopularTV: `/popular-tv`,
    fetchOnTheAirTV: `/on-the-air-tv`,
    // Movie Specific (Explicit)
    fetchTrendingMovies: `/trending-movies`,
    fetchNowPlayingMovies: `/now-playing-movies`,
    fetchPopularMovies: `/popular-movies`,
};

export default requests;
