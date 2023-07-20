import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import popcornImage from '../assets/popcorn.jpg'; // Import your popcorn image (adjust the path accordingly)

const Home = () => {
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
        {/* Add a carousel or grid to display featured movies */}
        {/* For example, you can use Bootstrap's Carousel component or create a custom movie grid */}
        <Row>
          <Col md={4} className="mb-4">
            <div className="border p-3 h-100 d-flex flex-column justify-content-between">
              <h4>Movie 1</h4>
              <p>Description of Movie 1</p>
              <Button variant="primary" href="/movies/1">
                Learn More
              </Button>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="border p-3 h-100 d-flex flex-column justify-content-between">
              <h4>Movie 2</h4>
              <p>Description of Movie 2</p>
              <Button variant="primary" href="/movies/2">
                Learn More
              </Button>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="border p-3 h-100 d-flex flex-column justify-content-between">
              <h4>Movie 3</h4>
              <p>Description of Movie 3</p>
              <Button variant="primary" href="/movies/3">
                Learn More
              </Button>
            </div>
          </Col>
        </Row>
        <hr className="my-4" />
        <h2 className="my-4">Upcoming Movie Sessions</h2>
        {/* Add a carousel or grid to display upcoming movie sessions */}
        {/* For example, you can use Bootstrap's Carousel component or create a custom session grid */}
        <Row>
          <Col md={6} className="mb-4">
            <div className="border p-3 h-100 d-flex flex-column justify-content-between">
              <h4>Session 1</h4>
              <p>Date and Time</p>
              <Button variant="primary" href="/sessions/1">
                Reserve Seats
              </Button>
            </div>
          </Col>
          <Col md={6} className="mb-4">
            <div className="border p-3 h-100 d-flex flex-column justify-content-between">
              <h4>Session 2</h4>
              <p>Date and Time</p>
              <Button variant="primary" href="/sessions/2">
                Reserve Seats
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
