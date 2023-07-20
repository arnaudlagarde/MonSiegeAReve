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
        <h1 className="my-4">Welcome to "Mon Siège à Rêve" Cinema</h1>
        <Row>
          <Col md={6} className="my-4">
            <img src={popcornImage} alt="Popcorn" className="img-fluid rounded" />
          </Col>
          <Col md={6} className="my-4">
            <h2>About Our Cinema</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor mauris ac nulla pellentesque, vel
              facilisis tortor fermentum. Sed id venenatis nisl. Suspendisse ullamcorper libero nec interdum tristique.
              Suspendisse ut lectus id lorem maximus blandit. Fusce iaculis lorem ut enim consectetur, vel fermentum
              sapien luctus.
            </p>
            <Button variant="primary" href="/about">
              Learn More
            </Button>
          </Col>
        </Row>
        <hr className="my-4" />
        <h2 className="my-4">Our Movies</h2>
        <Row>
          {movies.map((movie) => (
            <Col key={movie.id} md={4} className="mb-4">
              <div className="border p-3 h-100 d-flex flex-column justify-content-between">
                <h4>{movie.title}</h4>
                {/* Display the movie image */}
                <img src={movie.imageUrl} alt={movie.title} className="img-fluid rounded" />

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
