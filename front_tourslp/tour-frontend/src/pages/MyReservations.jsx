import React, { useEffect, useState } from 'react';
import './MyReservations.css';

function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/api/reservations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const message = await response.text();
          throw new Error(message || 'Error al obtener reservas');
        }

        const data = await response.json();
        setReservations(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="my-reservations-container">
      <h2>Mis Reservas</h2>

      {error && <p className="error">{error}</p>}

      {reservations.length === 0 && !error && (
        <p>No tienes reservas registradas.</p>
      )}

      <ul className="reservation-list">
        {reservations.map((res) => (
          <li key={res.id} className="reservation-card">
            <p><strong>Fecha:</strong> {res.date}</p>
            <p><strong>ID de reserva:</strong> {res.id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyReservations;
