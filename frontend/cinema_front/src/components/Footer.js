import React from 'react';

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="footer-content">
                    <div>
                        <h3>Cinéma "Mon Siège à Rêve"</h3>
                        <p>Address: 123 Movie Street, City</p>
                        <p>Phone: +123 456 7890</p>
                    </div>
                    <ul className="footer-links">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/reservation">Reservation</a>
                        </li>
                        <li>
                            <a href="/signup">Sign Up</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Footer;
