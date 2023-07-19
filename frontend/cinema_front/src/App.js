import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import CustomNavbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Reservation from './components/Reservation';
import SignUp from './components/SignUp';
import axios, { setAuthToken, getAuthToken } from './api'; // Import api.js

const App = () => {
  useEffect(() => {
    // Retrieve the authentication token from localStorage (or cookies)
    const token = getAuthToken();

    // Set the authentication token for Axios
    setAuthToken(token);
  }, []);

  return (
    <Router>
      <CustomNavbar />

      <Container className="my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Container>

      <Footer />
    </Router>
  );
};

export default App;
