import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

function Main() {
  const [tours, setTours] = useState([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/tours')
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener tours');
        return res.json();
      })
      .then((data) => setTours(data))
      .catch((err) => setError(err.message));
  }, []);

  const filteredTours = tours.filter(
    (tour) =>
      tour.name.toLowerCase().includes(search.toLowerCase()) ||
      tour.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="main">
      {/* Buscador */}
      <section className="section">
        <input
          type="text"
          placeholder="Buscar tours por nombre o destino..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      {/* Categorías */}
      <section className="section">
        <h2>Categorías</h2>
        <div className="category-grid">
          <div className="category">Playa</div>
          <div className="category">Montaña</div>
          <div className="category">Aventura</div>
          <div className="category">Familiar</div>
        </div>
      </section>

      {/* Recomendaciones */}
      <section className="section">
        <h2>Recomendaciones</h2>
        <p>Explora nuestras recomendaciones destacadas para ti...</p>
      </section>

      {/* Lista de Tours */}
      <section className="section">
        <h2>Tours disponibles</h2>
        {error && <p className="error">{error}</p>}

        <div className="tour-grid">
          {filteredTours.map((tour) => (
            <div key={tour.id} className="tour-card">
              <h3>{tour.name}</h3>
              <p>{tour.description}</p>
              <p><strong>Duración:</strong> {tour.durationDays} días</p>
              <p><strong>Desde:</strong> {tour.startDate}</p>
              <p><strong>Hasta:</strong> {tour.endDate}</p>

              {/* Botones */}
              <div className="tour-actions">
                <Link to={`/reserve/${tour.id}`} className="btn btn-reserve">
                  Reservar
                </Link>
                <Link to={`/tour/${tour.id}`} className="btn btn-detail">
                  Ver detalle
                </Link>
              </div>

              {/* Imagen */}
              {tour.imageUrls && tour.imageUrls.length > 0 && (
                <img
                  src={tour.imageUrls[0]}
                  alt="Tour"
                  className="tour-image"
                />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Main;
