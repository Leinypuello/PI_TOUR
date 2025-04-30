-- Limpieza previa
DELETE FROM tour_image_urls;
DELETE FROM tour;

-- Inserciones de tours
INSERT INTO tour (id, name, description, duration_days, start_date, end_date)
VALUES
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

-- Inserciones de imágenes por tour
INSERT INTO tour_image_urls (tour_id, image_urls) VALUES
(1, 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e'),
(2, 'https://images.unsplash.com/photo-1599331800705-df3b42e42fd5'),
(3, 'https://images.unsplash.com/photo-1602524813581-d30bd964d8f6'),
(4, 'https://images.unsplash.com/photo-1588392382834-a891154bca4d'),
(5, 'https://images.unsplash.com/photo-1542060748-10c28b62716d'),
(6, 'https://images.unsplash.com/photo-1613145991413-0b1e2d05dbb2'),
(7, 'https://images.unsplash.com/photo-1558981403-c5f9891e2505'),
(8, 'https://images.unsplash.com/photo-1632869029564-51f9db17ef2f'),
(9, 'https://images.unsplash.com/photo-1606230716077-3c6c6f47461a'),
(10, 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e');
