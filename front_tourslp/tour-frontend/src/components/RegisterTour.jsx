import React, { useState } from 'react';
import './RegisterTour.css';

function RegisterTour() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    durationDays: '',
    startDate: '',
    endDate: '',
    imageUrls: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/tours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          durationDays: parseInt(form.durationDays),
          imageUrls: form.imageUrls.split(',').map((url) => url.trim()),
        }),
      });

      const text = await response.text();

      if (response.status === 409 || text.includes('ya está en uso')) {
        setError('Ya existe un tour con ese nombre.');
        return;
      }


      if (response.status === 403) {
        setError('No tienes permisos para crear un tour.');
        return;
      }
      
      if (response.status === 403) {
        setError('No tienes permisos para crear un tour.');
        return;
      }
      
      if (!response.ok) {
        setError('Error al guardar el tour.');
        return;
      }
      

      setSuccess('Tour registrado exitosamente');
      setForm({
        name: '',
        description: '',
        durationDays: '',
        startDate: '',
        endDate: '',
        imageUrls: '',
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-tour-container">
      <h2>Registrar nuevo tour</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input name="name" value={form.name} onChange={handleChange} required />

        <label>Descripción</label>
        <textarea name="description" value={form.description} onChange={handleChange} required />

        <label>Duración (días)</label>
        <input name="durationDays" type="number" value={form.durationDays} onChange={handleChange} required />

        <label>Fecha inicio</label>
        <input name="startDate" type="date" value={form.startDate} onChange={handleChange} required />

        <label>Fecha fin</label>
        <input name="endDate" type="date" value={form.endDate} onChange={handleChange} required />

        <label>Imagen(es) (URLs separadas por coma)</label>
        <input name="imageUrls" value={form.imageUrls} onChange={handleChange} />

        <button type="submit">Guardar tour</button>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
}

export default RegisterTour;
