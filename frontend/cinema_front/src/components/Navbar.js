import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const CustomNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand as={Link} to="/">Cinéma "Mon Siège à rêve"</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Accueil</Nav.Link>
                    <Nav.Link as={Link} to="/reservation">Réserver des places</Nav.Link>
                    <Nav.Link as={Link} to="/signup">S'inscrire</Nav.Link>
                    <Nav.Link as={Link} to="/signin">Se connecter</Nav.Link>
                    <Nav.Link as={Link} to="/moviesessions">Movie Sessions</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default CustomNavbar;
