import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import requests from './requests';
import axios from './axios';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const [heroMovie, setHeroMovie] = useState(null);
  const [category, setCategory] = useState("home"); // home, tv, movies
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchHeroMovie() {
      try {
        let fetchUrl = requests.fetchTrending;
        if (category === "tv") fetchUrl = requests.fetchTrendingTV;
        if (category === "movies") fetchUrl = requests.fetchTrendingMovies;

        const request = await axios.get(fetchUrl);
        const validMovies = request.data.results.filter(item => item.media_type !== 'person' && item.backdrop_path);
        const randomIndex = Math.floor(Math.random() * validMovies.length);
        setHeroMovie(validMovies[randomIndex]);
        return request;
      } catch (error) {
        console.error("Failed to fetch hero movie:", error);
        setHeroMovie(null);
      }
    }
    fetchHeroMovie();
  }, [category]);

  const HomeScreen = () => (
    <>
      <Navbar setCategory={setCategory} activeCategory={category} user={user} setUser={setUser} />
      {heroMovie ? <Hero movie={heroMovie} /> : <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}

      <div style={{ marginTop: heroMovie ? '-150px' : '20px', position: 'relative', zIndex: 10 }}>
        {category === "home" && (
          <>
            <MovieRow title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
            <MovieRow title="Trending Now" fetchUrl={requests.fetchTrending} />
            <MovieRow title="Top Rated" fetchUrl={requests.fetchTopRated} />
            <MovieRow title="Action Movies" fetchUrl={requests.fetchActionMovies} />
            <MovieRow title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
            <MovieRow title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
            <MovieRow title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
            <MovieRow title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
          </>
        )}

        {category === "tv" && (
          <>
            <MovieRow title="Trending TV Shows" fetchUrl={requests.fetchTrendingTV} />
            <MovieRow title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} />
            <MovieRow title="Top Rated TV" fetchUrl={requests.fetchTopRatedTV} />
            <MovieRow title="Popular TV Shows" fetchUrl={requests.fetchPopularTV} />
            <MovieRow title="On The Air" fetchUrl={requests.fetchOnTheAirTV} />
          </>
        )}

        {category === "movies" && (
          <>
            <MovieRow title="Trending Movies" fetchUrl={requests.fetchTrendingMovies} />
            <MovieRow title="Top Rated Movies" fetchUrl={requests.fetchTopRated} />
            <MovieRow title="Popular Movies" fetchUrl={requests.fetchPopularMovies} />
            <MovieRow title="Action Movies" fetchUrl={requests.fetchActionMovies} />
            <MovieRow title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
            <MovieRow title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
          </>
        )}
      </div>

      <footer style={{
        padding: '50px 4%',
        color: '#757575',
        fontSize: '13px',
        marginTop: '50px'
      }}>
        <p>Questions? Call 000-800-040-1843</p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '15px',
          marginTop: '20px'
        }}>
          <span>FAQ</span>
          <span>Help Centre</span>
          <span>Account</span>
          <span>Media Centre</span>
          <span>Investor Relations</span>
          <span>Jobs</span>
          <span>Ways to Watch</span>
          <span>Terms of Use</span>
          <span>Privacy</span>
          <span>Cookie Preferences</span>
        </div>
      </footer>
    </>
  );

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
