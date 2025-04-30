package com.tourslp.tourslp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
public class AvailabilityResponse {

    private List<LocalDate> availableDates;
    private List<LocalDate> reservedDates;
}
