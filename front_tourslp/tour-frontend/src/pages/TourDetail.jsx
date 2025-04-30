import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TourDetail.css';

function TourDetail() {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/tours')
      .then(res => res.json())
      .then(data => {
        const selected = data.find(t => t.id === parseInt(tourId));
        if (!selected) {
          setError('Tour no encontrado');
        } else {
          setTour(selected);
        }
      })
      .catch(() => setError('Error al obtener el tour'));
  }, [tourId]);

  if (error) return <p className="error">{error}</p>;
  if (!tour) return <p className="loading">Cargando tour...</p>;

  return (
    <div className="tour-detail-page">
      <header className="tour-detail-header">
        <h2 className="title">{tour.name}</h2>
        <button onClick={() => navigate(-1)} className="back-btn">⬅ Volver</button>
      </header>

      <div className="tour-detail-content">
        <div className="tour-detail-info">
          <p>{tour.description}</p>
          <p><strong>Duración:</strong> {tour.durationDays} días</p>
          <p><strong>Desde:</strong> {tour.startDate}</p>
          <p><strong>Hasta:</strong> {tour.endDate}</p>
        </div>

        {tour.imageUrls?.length >= 1 && (
          <div className="gallery">
            <div className="main-image">
              <img src={tour.imageUrls[0]} alt="Principal" />
            </div>

            <div className="grid-images">
              {tour.imageUrls.slice(1, 5).map((url, i) => (
                <img key={i} src={url} alt={`Tour ${i}`} />
              ))}
            </div>

            <div className="gallery-footer">
              <button className="btn-see-more" onClick={() => navigate(`/gallery/${tour.id}`)}>
                Ver más
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TourDetail;
