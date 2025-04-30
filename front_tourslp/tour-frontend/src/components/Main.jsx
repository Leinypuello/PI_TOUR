import React, { useEffect, useState } from 'react';
import './Main.css';
import { Link } from 'react-router-dom';


function Main() {
  const [tours, setTours] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/tours')
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener tours');
        return res.json();
      })
      .then((data) => {
        const shuffled = data.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 10);
        setTours(selected);
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="main">

      {/* Buscador */}
      <section className="section">
        <input type="text" placeholder="Buscar tours por nombre o destino..." />
      </section>

      {/* Categorías (mock) */}
      <section className="section">
        <h2>Categorías</h2>
        <div className="category-grid">
          <div className="category">Playa</div>
          <div className="category">Montaña</div>
          <div className="category">Aventura</div>
          <div className="category">Familiar</div>
        </div>
      </section>

      {/* Recomendaciones (mock) */}
      <section className="section">
        <h2>Recomendaciones</h2>
        <p>Explora nuestras recomendaciones destacadas para ti...</p>
      </section>

      {/* Lista de tours aleatorios */}
      <section className="section">
        <h2>Tours disponibles</h2>
        {error && <p className="error">{error}</p>}
        <div className="tour-grid">
          {tours.map((tour) => (
            <div key={tour.id} className="tour-card">
              <h3>{tour.name}</h3>
              <p>{tour.description}</p>
              <p><strong>Duración:</strong> {tour.durationDays} días</p>
              <p><strong>Desde:</strong> {tour.startDate}</p>
              <p><strong>Hasta:</strong> {tour.endDate}</p>
              <Link to={`/reserve/${tour.id}`} className="btn">Reservar</Link>
              {tour.imageUrls && tour.imageUrls.length > 0 && (
                <img src={tour.imageUrls[0]} alt="Tour" className="tour-image" />
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Main;
