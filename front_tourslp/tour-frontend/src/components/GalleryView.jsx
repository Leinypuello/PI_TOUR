import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './GalleryView.css';

function GalleryView() {
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
  if (!tour) return <p className="loading">Cargando imágenes...</p>;

  return (
    <div className="gallery-page">
      <header className="gallery-header">
        <h2>Todas las imágenes de {tour.name}</h2>
        <button className="back-btn" onClick={() => navigate(-1)}>⬅ Volver</button>
      </header>

      <div className="gallery-grid">
        {tour.imageUrls && tour.imageUrls.map((url, i) => (
          <img key={i} src={url} alt={`Imagen ${i}`} className="gallery-img" />
        ))}
      </div>
    </div>
  );
}

export default GalleryView;
