import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import popcornImage from '../assets/popcorn.jpg';
import { fetchMovies } from '../api'; // Import the fetchMovies function from api.js

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch movies from your Django API
    const fetchMoviesData = async () => {
      console.log(localStorage.getItem('is_staff') + ' ' + localStorage.getItem('username'));
      try {
        const moviesData = await fetchMovies();
        setMovies(moviesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchMoviesData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Container>
        <h1 className="my-4">Mon Siège à Rêve</h1>
        <Row>
          <Col md={6} className="my-4">
            <img src={popcornImage} alt="Popcorn" className="img-fluid rounded" />
          </Col>
          <Col md={6} className="my-4">
            <h2>Notre Cinema</h2>
            <p>
              Vivez l'expérience cinéma ultime au cinéma Mon Siège à Rêve ! Confort, immersion, soirées à thème... Réservez vos sièges dès maintenant !
            </p>
            <Button variant="primary" href="/about">
              Learn More
            </Button>
          </Col>
        </Row>
        <hr className="my-4" />
        <h2 className="my-4">Nos films</h2>
        <Row>
          {movies.map((movie) => (
            <Col key={movie.id} md={4} className="mb-4">
              <div className="border p-3 h-100 d-flex flex-column justify-content-between">
                <h4>{movie.title}</h4>
                {/* Display the movie image */}
                <img src={movie.image} alt={movie.title} className="img-fluid rounded" />

                <p>{movie.description}</p>
                <Button variant="primary" href={`/movies/${movie.id}`}>
                  Learn More
                </Button>
              </div>
            </Col>
          ))}
        </Row>
        {/* ... Other content ... */}
      </Container>
    </div>
  );
};

export default Home;
