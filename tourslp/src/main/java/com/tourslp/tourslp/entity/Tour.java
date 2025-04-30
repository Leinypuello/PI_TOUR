package com.tourslp.tourslp.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;


@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Tour {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private Integer durationDays;

    private LocalDate startDate;

    private LocalDate endDate;

    @ElementCollection
    private List<String> imageUrls; // URLs o rutas relativas de imágenes cargadas
}
