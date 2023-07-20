import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import CustomNavbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Reservation from './components/Reservation';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import MovieSessionsPage from './components/MovieSessionsPage';
import MovieForm from './components/MovieForm';
import { getAuthToken, setAuthToken } from './api'; // Import setAuthToken as a named import

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
      <div className="d-flex flex-column" style={{ minHeight: '160vh' }}>
        <Container className="flex-grow-1 my-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/moviesessions" element={<MovieSessionsPage />} />
            <Route path="/add-movie" element={<MovieForm />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default App;
