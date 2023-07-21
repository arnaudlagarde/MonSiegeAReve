import React, { useState } from 'react';
import api from '../api';

const MovieForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: null,
    special: false,
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({
      ...formData,
      image: imageFile,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('special', formData.special);

      // Vérifier si une image est sélectionnée avant de l'ajouter au FormData
      if (formData.image) {
        formDataToSend.append('image', formData.image, formData.image.name);
      }

      const response = await api.post('/api/movies/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Effacer les champs du formulaire après la soumission réussie
      setFormData({
        title: '',
        description: '',
        price: '',
        image: null,
        special: false,
      });

      // Afficher le message de succès
      setSuccessMessage('Le film a été ajouté avec succès !');

      // Effacer le message de succès après quelques secondes
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error(error);

      // Afficher le message d'erreur
      setErrorMessage('Une erreur s\'est produite lors de l\'ajout du film.');

      // Effacer le message d'erreur après quelques secondes
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  return (
    <div className="container">
      <h2>Ajouter un nouveau film</h2>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Titre :
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description :
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Prix :
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image :
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="form-control"
          />
        </div>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            id="special"
            name="special"
            checked={formData.special}
            onChange={(e) =>
              setFormData({
                ...formData,
                special: e.target.checked,
              })
            }
            className="form-check-input"
          />
          <label htmlFor="special" className="form-check-label">
            Spécial
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Ajouter un film
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
