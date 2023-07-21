// CustomNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { getAuthToken } from '../api'; // Import the getAuthToken function

const CustomNavbar = () => {
    const authToken = getAuthToken(); // Get the authentication token from localStorage

    const handleLogout = () => {
        console.log('handlelogout de navbar');
        // Remove the authToken from localStorage to simulate logging out
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        localStorage.removeItem('is_staff');
        window.location.reload();
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" style={{ padding: '15px 30px', justifyContent: 'space-between' }}>
            <Navbar.Brand as={Link} to="/">
                Mon Siège à rêve
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">
                        Accueil
                    </Nav.Link>
                    {authToken && (
                        <>
                            <Nav.Link as={Link} to="/reservation">
                                Réserver des places
                            </Nav.Link>
                            <Nav.Link as={Link} to="/purchase-history">
                                Historique d'achats
                            </Nav.Link>
                        </>
                    )}
                    <Nav.Link as={Link} to="/moviesessions">
                        Movie Sessions
                    </Nav.Link>
                    {/* Remove the isAdmin check since it is not defined */}
                </Nav>
                <Nav>
                    {!authToken ? (
                        <>
                            <Nav.Link as={Link} to="/signup">
                                S'inscrire
                            </Nav.Link>
                            <Nav.Link as={Link} to="/signin">
                                Se connecter
                            </Nav.Link>
                        </>
                    ) : (
                        <Button variant="dark" size="sm" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center' }}>
                            <FontAwesomeIcon icon={faUser} style={{ color: 'white', marginRight: '5px' }} />
                            Se déconnecter
                        </Button>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default CustomNavbar;
