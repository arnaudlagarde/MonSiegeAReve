import React, { useState } from 'react';
import axios from '../api'; // Import the updated api.js file
import { Button, Toast } from 'react-bootstrap';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    isAdmin: 'no', // Par défaut, l'utilisateur n'est pas un administrateur
  });

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCloseToasts = () => {
    setShowSuccessToast(false);
    setShowErrorToast(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert form data to JSON format
      const jsonData = JSON.stringify(formData);

      const response = await axios.post('/api/signup/', jsonData, {
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
      });

      // Retrieve the authentication token from the response
      const token = response.data.token;

      // Save the token to localStorage or cookies (use appropriate method)
      // Example using localStorage:
      localStorage.setItem('authToken', token);

      console.log('User registered:', response.data);

      // Show the success toast
      setShowSuccessToast(true);
    } catch (error) {
      console.error('Error registering user:', error);

      // Show the error toast
      setShowErrorToast(true);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Créer un compte</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nom d'utilisateur :</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Mot de passe :</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Administrateur :</label>
          <select name="isAdmin" value={formData.isAdmin} onChange={handleChange} className="form-select">
            <option value="yes">Oui</option>
            <option value="no">Non</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">S'inscrire</button>
      </form>

      {/* Success Toast */}
      <Toast show={showSuccessToast} onClose={handleCloseToasts} delay={3000} autohide>
        <Toast.Header closeButton={false}>
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>
          Your registration was successful.
        </Toast.Body>
      </Toast>

      {/* Error Toast */}
      <Toast show={showErrorToast} onClose={handleCloseToasts} delay={3000} autohide bg="danger" text="white">
        <Toast.Header closeButton={false}>
          <strong className="me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>
          There was an error with your registration. Please try again.
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default SignUp;
