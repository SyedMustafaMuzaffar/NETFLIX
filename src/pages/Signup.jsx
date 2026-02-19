import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios'; // Ensure this points to your axios instance or use fetch
import styled from 'styled-components';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5001/api/signup', { email, password });
            navigate('/login');
        } catch (error) {
            console.error("Signup failed", error);
            alert(error.response?.data?.error || "Signup failed");
        }
    };

    return (
        <Container>
            <div className="content">
                <h1>Sign Up</h1>
                <form onSubmit={handleSignup}>
                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Sign Up</button>
                </form>
                <p>Already have an account? <span onClick={() => navigate('/login')}>Sign In now.</span></p>
            </div>
        </Container>
    );
};

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;

  .content {
    background-color: rgba(0, 0, 0, 0.75);
    padding: 60px 68px 40px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 450px;

    h1 {
      margin-bottom: 28px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 16px;

      input {
        padding: 16px 20px;
        background: #333;
        border: none;
        border-radius: 4px;
        color: white;
        width: 100%;
      }

      button {
        padding: 16px;
        background-color: #e50914;
        border: none;
        border-radius: 4px;
        color: white;
        font-weight: bold;
        font-size: 1rem;
        cursor: pointer;
        margin-top: 12px;

        &:hover {
          background-color: #bd0812;
        }
      }
    }

    p {
      color: #737373;
      span {
        color: white;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

export default Signup;
