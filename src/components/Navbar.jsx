import React, { useState, useEffect } from 'react';
import { Search, Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setCategory, activeCategory, user, setUser }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navItems = [
        { label: 'Home', value: 'home' },
        { label: 'TV Shows', value: 'tv' },
        { label: 'Movies', value: 'movies' },
        { label: 'New & Popular', value: 'home' }, // Default to home for now
        { label: 'My List', value: 'home' } // Default to home for now
    ];

    const handleLogout = () => {
        setUser(null);
        navigate('/');
    };

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            height: '68px',
            zIndex: 100,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 4%',
            transition: 'background-color 0.3s ease-in-out',
            backgroundColor: isScrolled ? 'var(--netflix-black)' : 'transparent',
            backgroundImage: isScrolled ? 'none' : 'linear-gradient(to bottom, rgba(0,0,0,0.7) 10%, rgba(0,0,0,0))'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                <h1
                    style={{ color: 'var(--netflix-red)', fontSize: '2rem', fontWeight: 'bold', cursor: 'pointer', margin: 0 }}
                    onClick={() => {
                        setCategory('home');
                        navigate('/');
                    }}
                >
                    NETFLIX
                </h1>

                <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', margin: 0, padding: 0 }}>
                    {navItems.map((item) => (
                        <li key={item.label}>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCategory(item.value);
                                    window.scrollTo(0, 0); // Reset scroll to top
                                }}
                                style={{
                                    color: activeCategory === item.value ? 'white' : '#e5e5e5',
                                    fontSize: '14px',
                                    fontWeight: activeCategory === item.value ? 'bold' : 'normal',
                                    transition: 'color 0.3s'
                                }}
                                onMouseEnter={(e) => e.target.style.color = '#b3b3b3'}
                                onMouseLeave={(e) => e.target.style.color = activeCategory === item.value ? 'white' : '#e5e5e5'}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: 'white' }}>
                <Search size={20} style={{ cursor: 'pointer' }} />
                <span style={{ fontSize: '14px', cursor: 'pointer' }}>{user ? user.email : 'Guest'}</span>
                <Bell size={20} style={{ cursor: 'pointer' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '4px', backgroundColor: '#e50914', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={18} />
                    </div>
                </div>

                {user ? (
                    <button
                        onClick={handleLogout}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#e50914',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '14px'
                        }}
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <button
                            onClick={() => navigate('/login')}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#e50914',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '14px'
                            }}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => navigate('/signup')}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#e50914',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '14px',
                                marginLeft: '10px'
                            }}
                        >
                            Sign Up
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
