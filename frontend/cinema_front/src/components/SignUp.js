// SignUp.js

import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    isAdmin: 'no', // Par défaut, l'utilisateur n'est pas un administrateur
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/signup/', formData);
      console.log('User registered:', response.data);
      // You can redirect to a different page here after successful registration
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div>
      <h2>Créer un compte</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom d'utilisateur :</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <label>Administrateur :</label>
          <select name="isAdmin" value={formData.isAdmin} onChange={handleChange}>
            <option value="yes">Oui</option>
            <option value="no">Non</option>
          </select>
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default SignUp;
