import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const CustomNavbar = () => {

    const authToken = localStorage.getItem('authToken'); // Get the authentication token from localStorage

    const handleLogout = () => {
        console.log('handlelogout de navbar');
        // Remove the authToken from localStorage to simulate logging out
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        localStorage.removeItem('is_staff');
        window.location.reload();
      };
    

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand as={Link} to="/">Cinéma "Mon Siège à rêve"</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Accueil</Nav.Link>
                    <Nav.Link as={Link} to="/reservation">Réserver des places</Nav.Link>
                    {!authToken && ( // Show the following links only when the user is not logged in
                    <>
                        <Nav.Link as={Link} to="/signup">
                            S'inscrire
                        </Nav.Link>
                        <Nav.Link as={Link} to="/signin">
                            Se connecter
                        </Nav.Link>
                    </>
                    )}
                    {authToken && ( // Show the following link only when the user is logged in
                        <Nav.Link as={Link} to="/" onClick={handleLogout}>
                            Se déconnecter
                        </Nav.Link>
                    )}
                    <Nav.Link as={Link} to="/moviesessions">Movie Sessions</Nav.Link>
                    <Nav.Link as={Link} to="/add-movie">
            Ajouter un film
          </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default CustomNavbar;
