import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ReserveTour.css';

function ReserveTour() {
  const { tourId } = useParams();
  const navigate = useNavigate();

  const [tour, setTour] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [disabledDates, setDisabledDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8080/api/tours`)
      .then(res => res.json())
      .then(data => {
        const selected = data.find(t => t.id === parseInt(tourId));
        if (!selected) {
          setError('Tour no encontrado');
        } else {
          setTour(selected);
        }
      });
  }, [tourId]);

  useEffect(() => {
    const fetchDisabledDates = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/reservations/disabled-dates/${tourId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!res.ok) throw new Error('No se pudieron obtener las fechas ocupadas');
        const data = await res.json();
        const parsed = data.map(date => new Date(date));
        setDisabledDates(parsed);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchDisabledDates();
  }, [tourId]);

  const handleReserve = async () => {
    if (!selectedDate) {
      setError('Por favor selecciona una fecha válida.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: selectedDate.toISOString().split('T')[0],
          description: description,
        }),
      });

      if (response.status === 409) {
        const msg = await response.text();
        setError(msg || 'Ya existe una reserva para ese día.');
        return;
      }

      if (response.status === 403) {
        setError('No tienes permisos para reservar.');
        return;
      }

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || 'Error al hacer la reserva');
      }

      setSuccess('Reserva realizada exitosamente');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!tour) return <p>Cargando...</p>;

  return (
    <div className="reserve-container">
      <h2>Reservar Tour</h2>

      <div className="tour-detail">
        <h3>{tour.name}</h3>
        <p>{tour.description}</p>
        <p><strong>Desde:</strong> {tour.startDate}</p>
        <p><strong>Hasta:</strong> {tour.endDate}</p>
        {tour.imageUrls?.[0] && <img src={tour.imageUrls[0]} alt="Tour" />}
      </div>

      <div className="form-group">
        <label>Selecciona una fecha</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          excludeDates={disabledDates}
          minDate={new Date(tour.startDate)}
          maxDate={new Date(tour.endDate)}
          placeholderText="Haz clic para elegir una fecha"
          className="datepicker"
        />
      </div>

      <div className="form-group">
        <label>Descripción (opcional)</label>
        <textarea
          placeholder="Comentarios adicionales..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button onClick={handleReserve} className="confirm-button">Confirmar reserva</button>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
}

export default ReserveTour;
