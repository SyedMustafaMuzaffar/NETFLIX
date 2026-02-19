import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import styled from 'styled-components';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/login', { email, password });
      setUser(response.data.user);
      navigate('/');
    } catch (error) {
      console.error("Login failed", error);
      alert(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <Container>
      <div className="content">
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
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
          <button type="submit">Sign In</button>
        </form>
        <p>New to Netflix? <span onClick={() => navigate('/signup')}>Sign up now.</span></p>
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

export default Login;
