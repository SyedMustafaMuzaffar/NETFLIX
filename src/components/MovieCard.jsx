import React from 'react';
import { getImageUrl } from '../utils/mockData';
import '../index.css'; // Ensure CSS is available

const MovieCard = ({ movie, isLargeRow }) => {
    return (
        <img
            className={`row__poster ${isLargeRow && "row__posterLarger"}`}
            src={getImageUrl(movie.poster_path)}
            alt={movie.name}
            onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = "none"; // Hide broken images
            }}
        />
    );
};

export default MovieCard;
