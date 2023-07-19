// Reservation.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reservation = () => {
  const [movies, setMovies] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [specialSessions, setSpecialSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [seatsRequested, setSeatsRequested] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchMovies();
    fetchSessions();
    fetchSpecialSessions();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('/api/movies/');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchSessions = async () => {
    try {
      const response = await axios.get('/api/sessions/');
      setSessions(response.data);
    } catch (error) {
      console.error('Error fetching regular sessions:', error);
    }
  };

  const fetchSpecialSessions = async () => {
    try {
      const response = await axios.get('/api/special_sessions/');
      setSpecialSessions(response.data);
    } catch (error) {
      console.error('Error fetching special sessions:', error);
    }
  };

  const handleReservation = async () => {
    if (!selectedSession) {
      setMessage('Please select a session');
      return;
    }

    try {
      const response = await axios.post('/api/reserve/', {
        session_id: selectedSession,
        seats: seatsRequested,
      });

      setMessage(response.data.message);
      // Refresh sessions after a successful reservation
      fetchSessions();
      fetchSpecialSessions();
    } catch (error) {
      setMessage('Unable to reserve seats. Check available seats.');
    }
  };

  return (
    <div>
      <h2>Reserve Seats</h2>
      <div>
        <label>Select a session:</label>
        <select onChange={(e) => setSelectedSession(e.target.value)}>
          <option value="">Choose a session</option>
          {sessions.map((session) => (
            <option key={session.id} value={session.id}>
              {session.movie.title} - {session.date} {session.time}
            </option>
          ))}
          {specialSessions.map((session) => (
            <option key={session.id} value={session.id}>
              {session.movie} - {session.date} {session.time}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Number of seats:</label>
        <input type="number" min="1" value={seatsRequested} onChange={(e) => setSeatsRequested(e.target.value)} />
      </div>
      <button onClick={handleReservation}>Reserve</button>
      <p>{message}</p>
    </div>
  );
};

export default Reservation;