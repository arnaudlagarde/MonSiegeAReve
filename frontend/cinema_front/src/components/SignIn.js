import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Form, Button, Container, Alert } from 'react-bootstrap';
import api from '../api'; // Import api.js

const SignIn = () => {
    const navigate = useNavigate(); // Use useNavigate to navigate to different pages
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/token/', formData);
            const token = response.data.token;
            localStorage.setItem('authToken', token);
            api.setAuthToken(token);
            setMessage('Sign in successful!');
            // Use navigate to redirect to the reservation page after successful sign-in
            navigate('/reservation');
        } catch (error) {
            setMessage('Invalid credentials. Please try again.');
        }
    };

    return (
        <Container>
            <h2>Sign In</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
                </Form.Group>
                <Button type="submit" variant="primary">Sign In</Button>
            </Form>
            {message && <Alert variant="info">{message}</Alert>}
        </Container>
    );
};

export default SignIn;
