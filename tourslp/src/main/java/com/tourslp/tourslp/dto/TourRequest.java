package com.tourslp.tourslp.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class TourRequest {

    private String name;
    private String description;
    private Integer durationDays;
    private LocalDate startDate;
    private LocalDate endDate;
    private List<String> imageUrls; // suponiendo que vienen como URLs por ahora
}
