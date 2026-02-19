import React, { useState, useEffect, useRef } from 'react';
import axios from '../axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import '../index.css';

const MovieRow = ({ title, fetchUrl, isLargeRow = false }) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const rowRef = useRef(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(fetchUrl);
                // Ensure we have results and posters
                if (request.data && request.data.results) {
                    setMovies(request.data.results.filter(item => item.poster_path));
                }
                return request;
            } catch (error) {
                console.error("Error fetching movie row data:", error);
            }
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "100%",
        width: "100%",
        playerVars: {
            autoplay: 1,
            fs: 1, // Enable full screen button
            playsinline: 1,
        },
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch((error) => console.log(error));
        }
    };

    // Scroll helper (keep inline or move to util)
    const scroll = (direction) => {
        const { current } = rowRef;
        if (current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="row">
            <h2>{title}</h2>

            <div style={{ position: 'relative' }} className="group">
                {/* Left Arrow - hidden by default, shown on hover via CSS */}
                <div
                    className="slider-arrow-left"
                    onClick={() => scroll('left')}
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '50px',
                        zIndex: 100,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'none',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <ChevronLeft color="white" size={40} />
                </div>

                <div className="row__posters scrollbar-hide" ref={rowRef}>
                    {movies.map(movie => (
                        <div key={movie.id} onClick={() => handleClick(movie)} style={{ flex: '0 0 auto' }}>
                            <MovieCard movie={movie} isLargeRow={isLargeRow} />
                        </div>
                    ))}
                </div>

                {/* Right Arrow */}
                <div
                    className="slider-arrow-right"
                    onClick={() => scroll('right')}
                    style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: '50px',
                        zIndex: 100,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'none',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <ChevronRight color="white" size={40} />
                </div>
            </div>

            {trailerUrl && (
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', marginTop: '20px' }}>
                    <YouTube
                        videoId={trailerUrl}
                        opts={opts}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    />
                </div>
            )}
        </div>
    );
};

export default MovieRow;
