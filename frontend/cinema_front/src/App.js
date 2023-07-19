// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Reservation from './components/Reservation';
import SignUp from './components/SignUp'; // Importer le composant SignUp

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/reservation">Réserver des places</Link>
            </li>
            <li>
              <Link to="/signup">S'inscrire</Link> {/* Lien vers la page d'inscription */}
            </li>
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/signup" element={<SignUp />} /> {/* Route pour la page d'inscription */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
