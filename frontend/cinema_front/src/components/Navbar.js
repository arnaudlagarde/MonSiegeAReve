import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/">Cinéma "Mon Siège à rêve"</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar" />
            <Navbar.Collapse id="navbar">
                <Nav className="ml-auto">
                    <Nav.Link href="/">Accueil</Nav.Link>
                    <Nav.Link href="/reservation">Réserver des places</Nav.Link>
                    <Nav.Link href="/signup">S'inscrire</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
