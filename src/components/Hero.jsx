import React, { useState } from 'react';
import { Play, Info, X } from 'lucide-react';
import { getImageUrl } from '../utils/mockData';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const Hero = ({ movie }) => {
    const [trailerUrl, setTrailerUrl] = useState("");

    if (!movie) return null;

    const handlePlay = () => {
        if (trailerUrl) {
            setTrailerUrl(""); // Toggle off if already playing
        } else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch((error) => console.log(error));
        }
    };

    const opts = {
        height: "100%",
        width: "100%",
        playerVars: {
            autoplay: 1,
            fs: 1, // Enable full screen button
            playsinline: 1,
        },
    };

    return (
        <header style={{
            height: '80vh',
            position: 'relative',
            color: 'white',
            objectFit: 'contain',
            backgroundImage: `url("${getImageUrl(movie.backdrop_path)}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
        }}>
            {/* Gradient Overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                background: 'linear-gradient(to bottom, transparent 70%, var(--netflix-black))'
            }} />
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                background: 'linear-gradient(to right, var(--netflix-black) 0%, transparent 50%)'
            }} />


            <div style={{
                marginLeft: '4%',
                paddingTop: '30vh',
                height: '190px',
                position: 'relative',
                zIndex: 10,
                maxWidth: '600px'
            }}>
                <h1 style={{
                    fontSize: '3rem',
                    fontWeight: '800',
                    paddingBottom: '0.3rem',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}>
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                <div style={{ display: 'flex', gap: '10px', margin: '1rem 0' }}>
                    <button style={{
                        cursor: 'pointer',
                        color: 'black',
                        outline: 'none',
                        border: 'none',
                        fontWeight: '700',
                        borderRadius: '4px',
                        padding: '0.8rem 2rem',
                        marginRight: '1rem',
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '1.2rem'
                    }}
                        onClick={handlePlay}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.75)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                        <Play fill="black" size={24} /> {trailerUrl ? "Close" : "Play"}
                    </button>
                    <button style={{
                        cursor: 'pointer',
                        color: 'white',
                        outline: 'none',
                        border: 'none',
                        fontWeight: '700',
                        borderRadius: '4px',
                        padding: '0.8rem 2rem',
                        backgroundColor: 'rgba(109, 109, 110, 0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '1.2rem',
                        transition: 'all 0.2s'
                    }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(109, 109, 110, 0.4)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(109, 109, 110, 0.7)'}
                    >
                        <Info size={24} /> More Info
                    </button>
                </div>

                <p style={{
                    width: '100%',
                    lineHeight: '1.3',
                    paddingTop: '1rem',
                    fontSize: '1.2rem',
                    maxWidth: '80%',
                    height: '80px',
                    color: '#fff',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                }}>
                    {movie.description}
                </p>

                {/* Trailer Video Player Overlay */}
                {trailerUrl && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        zIndex: 1000,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '20px'
                    }}>
                        <div style={{ position: 'relative', width: '80%', maxWidth: '1000px' }}>
                            <button
                                onClick={() => setTrailerUrl("")}
                                style={{
                                    position: 'absolute',
                                    top: '-40px',
                                    right: '-40px',
                                    background: 'transparent',
                                    color: 'white',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                <X size={40} />
                            </button>
                            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                                <YouTube
                                    videoId={trailerUrl}
                                    opts={opts}
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Hero;
