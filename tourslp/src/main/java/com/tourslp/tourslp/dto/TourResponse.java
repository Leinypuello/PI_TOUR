package com.tourslp.tourslp.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;


@Data
@Builder
public class TourResponse {

    private Long id;
    private String name;
    private String description;
    private Integer durationDays;
    private LocalDate startDate;
    private LocalDate endDate;
    private List<String> imageUrls;
}
