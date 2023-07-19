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
    <div className="container mt-5">
      <h2 className="mb-4">Créer un compte</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Nom d'utilisateur:</label>
          <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Mot de passe:</label>
          <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="isAdmin" className="form-label">Administrateur:</label>
          <select className="form-select" id="isAdmin" name="isAdmin" value={formData.isAdmin} onChange={handleChange}>
            <option value="yes">Oui</option>
            <option value="no">Non</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">S'inscrire</button>
      </form>
    </div>
  );
};

export default SignUp;
