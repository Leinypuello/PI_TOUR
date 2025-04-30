-- Eliminar datos previos (opcional para pruebas locales)
DELETE FROM tour_image_urls;
DELETE FROM tour;

-- Inserciones de tours
INSERT INTO tour (id, name, description, duration_days, start_date, end_date) VALUES
(1, 'Cartagena Colonial', 'Tour histórico por el centro amurallado de Cartagena', 3, '2025-05-10', '2025-05-12'),
(2, 'Santa Marta Aventura', 'Explora las playas y montañas de Santa Marta', 4, '2025-06-01', '2025-06-04'),
(3, 'San Andrés Paraíso', 'Descubre el mar de los 7 colores en San Andrés', 5, '2025-07-15', '2025-07-20'),
(4, 'Bogotá Cultural', 'Museos, historia y gastronomía en la capital', 2, '2025-05-20', '2025-05-22'),
(5, 'Eje Cafetero', 'Café, montañas y pueblos mágicos de Colombia', 3, '2025-08-05', '2025-08-08'),
(6, 'Medellín Moderna', 'La ciudad de la eterna primavera te espera', 3, '2025-05-25', '2025-05-28'),
(7, 'Amazonas Salvaje', 'Una experiencia única en la selva colombiana', 5, '2025-06-10', '2025-06-15'),
(8, 'Guajira Extrema', 'Dunas, desierto y mar en un solo lugar', 4, '2025-07-01', '2025-07-05'),
(9, 'Villa de Leyva Romántica', 'Un escape colonial entre montañas', 2, '2025-06-18', '2025-06-20'),
(10, 'Isla Múcura Relax', 'Relájate en playas escondidas del Caribe', 3, '2025-05-30', '2025-06-02');

-- Lista de imágenes que se usarán para todos los tours
-- (puedes personalizar si quieres que cada tour tenga imágenes distintas)
INSERT INTO tour_image_urls (tour_id, image_urls) VALUES
-- Tour 1
(1, 'https://images.unsplash.com/photo-1616401787759-e1bdfb291a0b'),
(1, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'),
(1, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'),
(1, 'https://images.unsplash.com/photo-1589394814612-1c0d308eeedb'),
(1, 'https://images.unsplash.com/photo-1573497019254-ff03b26c1f3e'),

-- Tour 2
(2, 'https://images.unsplash.com/photo-1616401787759-e1bdfb291a0b'),
(2, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'),
(2, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'),
(2, 'https://images.unsplash.com/photo-1589394814612-1c0d308eeedb'),
(2, 'https://images.unsplash.com/photo-1573497019254-ff03b26c1f3e'),

-- Tour 3
(3, 'https://images.unsplash.com/photo-1616401787759-e1bdfb291a0b'),
(3, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'),
(3, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'),
(3, 'https://images.unsplash.com/photo-1589394814612-1c0d308eeedb'),
(3, 'https://images.unsplash.com/photo-1573497019254-ff03b26c1f3e'),

-- Tour 4
(4, 'https://images.unsplash.com/photo-1616401787759-e1bdfb291a0b'),
(4, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'),
(4, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'),
(4, 'https://images.unsplash.com/photo-1589394814612-1c0d308eeedb'),
(4, 'https://images.unsplash.com/photo-1573497019254-ff03b26c1f3e'),

-- Tour 5
(5, 'https://images.unsplash.com/photo-1616401787759-e1bdfb291a0b'),
(5, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'),
(5, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'),
(5, 'https://images.unsplash.com/photo-1589394814612-1c0d308eeedb'),
(5, 'https://images.unsplash.com/photo-1573497019254-ff03b26c1f3e'),

-- Tour 6
(6, 'https://images.unsplash.com/photo-1616401787759-e1bdfb291a0b'),
(6, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'),
(6, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'),
(6, 'https://images.unsplash.com/photo-1589394814612-1c0d308eeedb'),
(6, 'https://images.unsplash.com/photo-1573497019254-ff03b26c1f3e'),

-- Tour 7
(7, 'https://images.unsplash.com/photo-1616401787759-e1bdfb291a0b'),
(7, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'),
(7, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'),
(7, 'https://images.unsplash.com/photo-1589394814612-1c0d308eeedb'),
(7, 'https://images.unsplash.com/photo-1573497019254-ff03b26c1f3e'),

-- Tour 8
(8, 'https://images.unsplash.com/photo-1616401787759-e1bdfb291a0b'),
(8, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'),
(8, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'),
(8, 'https://images.unsplash.com/photo-1589394814612-1c0d308eeedb'),
(8, 'https://images.unsplash.com/photo-1573497019254-ff03b26c1f3e'),

-- Tour 9
(9, 'https://images.unsplash.com/photo-1616401787759-e1bdfb291a0b'),
(9, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'),
(9, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'),
(9, 'https://images.unsplash.com/photo-1589394814612-1c0d308eeedb'),
(9, 'https://images.unsplash.com/photo-1573497019254-ff03b26c1f3e'),

-- Tour 10
(10, 'https://images.unsplash.com/photo-1616401787759-e1bdfb291a0b'),
(10, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'),
(10, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'),
(10, 'https://images.unsplash.com/photo-1589394814612-1c0d308eeedb'),
(10, 'https://images.unsplash.com/photo-1573497019254-ff03b26c1f3e');
