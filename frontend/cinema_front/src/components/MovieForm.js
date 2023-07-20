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
      const response = await api.post('/api/movies/', formData);
      console.log(response.data);
      // Clear the form fields after successful submission
      setFormData({
        title: '',
        description: '',
        price: '',
        image: null,
        special: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Add a New Movie</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
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
            Description:
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
            Price:
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
            Image:
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
            Special
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
