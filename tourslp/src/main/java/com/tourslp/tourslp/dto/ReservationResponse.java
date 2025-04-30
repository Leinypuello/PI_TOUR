package com.tourslp.tourslp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;


@Setter
@Getter
@AllArgsConstructor
@Builder
public class ReservationResponse {

    private Long id;
    private LocalDate date;
    private String description;
}
