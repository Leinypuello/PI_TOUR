import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TourDetail.css';

function TourDetail() {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [error, setError] = useState('');

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
      })
      .catch(() => setError('Error al obtener datos del tour'));
  }, [tourId]);

  if (error) return <p className="error">{error}</p>;
  if (!tour) return <p className="loading">Cargando...</p>;

  return (
    <div className="tour-detail-page">
      <header className="tour-detail-header">
        <h2>{tour.name}</h2>
        <button className="back-button" onClick={() => navigate(-1)}>← Volver</button>
      </header>

      <section className="tour-body">
        <p>{tour.description}</p>
        <p><strong>Duración:</strong> {tour.durationDays} días</p>
        <p><strong>Desde:</strong> {tour.startDate}</p>
        <p><strong>Hasta:</strong> {tour.endDate}</p>
        {tour.imageUrls?.length > 0 && (
          <div className="image-gallery">
            {tour.imageUrls.map((url, idx) => (
              <img key={idx} src={url} alt={`Imagen ${idx + 1}`} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default TourDetail;
