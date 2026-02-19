const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config({ path: '../.env' }); // Load .env from root

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5001;
const API_KEY = process.env.VITE_TMDB_API_KEY;
const fs = require('fs');
const path = require('path');
const BASE_URL = "https://api.themoviedb.org/3";
const USERS_FILE = path.join(__dirname, 'data', 'users.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'));
}
if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, '[]');
}

// Auth Routes
app.post('/api/signup', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    const users = JSON.parse(fs.readFileSync(USERS_FILE));
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ error: "User already exists" });
    }

    const newUser = { id: Date.now(), email, password }; // In production, hash the password!
    users.push(newUser);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

    res.status(201).json({ message: "User created successfully", user: { email: newUser.email } });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const users = JSON.parse(fs.readFileSync(USERS_FILE));
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user: { email: user.email } });
});

// Middleware already applied at top


// Helper to fetch from TMDB
const fetchFromTMDB = async (res, endpoint, params = {}) => {
    try {
        const response = await axios.get(`${BASE_URL}${endpoint}`, {
            params: {
                api_key: API_KEY,
                language: 'en-US',
                ...params
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error.message);
        res.status(500).json({ error: "Failed to fetch data from TMDB" });
    }
};

// Routes mirroring requests.js
app.get('/api/trending', (req, res) => fetchFromTMDB(res, '/trending/all/week'));
app.get('/api/netflix-originals', (req, res) => fetchFromTMDB(res, '/discover/tv', { with_networks: 213 }));
app.get('/api/top-rated', (req, res) => fetchFromTMDB(res, '/movie/top_rated'));
app.get('/api/action', (req, res) => fetchFromTMDB(res, '/discover/movie', { with_genres: 28 }));
app.get('/api/comedy', (req, res) => fetchFromTMDB(res, '/discover/movie', { with_genres: 35 }));
app.get('/api/horror', (req, res) => fetchFromTMDB(res, '/discover/movie', { with_genres: 27 }));
app.get('/api/romance', (req, res) => fetchFromTMDB(res, '/discover/movie', { with_genres: 10749 }));
app.get('/api/documentaries', (req, res) => fetchFromTMDB(res, '/discover/movie', { with_genres: 99 }));

// TV Specific
app.get('/api/trending-tv', (req, res) => fetchFromTMDB(res, '/trending/tv/week'));
app.get('/api/top-rated-tv', (req, res) => fetchFromTMDB(res, '/tv/top_rated'));
app.get('/api/popular-tv', (req, res) => fetchFromTMDB(res, '/tv/popular'));
app.get('/api/on-the-air-tv', (req, res) => fetchFromTMDB(res, '/tv/on_the_air'));

// Movie Specific
app.get('/api/trending-movies', (req, res) => fetchFromTMDB(res, '/trending/movie/week'));
app.get('/api/now-playing-movies', (req, res) => fetchFromTMDB(res, '/movie/now_playing'));
app.get('/api/popular-movies', (req, res) => fetchFromTMDB(res, '/movie/popular'));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API Key loaded: ${!!API_KEY}`);
});

process.on('exit', (code) => {
    console.log(`Process exited with code: ${code}`);
});

process.on('SIGINT', () => {
    console.log('Process received SIGINT');
    process.exit();
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

// Keep alive just in case
setInterval(() => { }, 10000);
