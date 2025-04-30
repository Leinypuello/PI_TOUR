package com.tourslp.tourslp.controller;


import com.tourslp.tourslp.dto.TourRequest;
import com.tourslp.tourslp.dto.TourResponse;
import com.tourslp.tourslp.entity.Tour;
import com.tourslp.tourslp.service.TourService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tours")
@RequiredArgsConstructor
public class TourController {

    private final TourService tourService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Tour> create(@RequestBody TourRequest request) {
        Tour tour = tourService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(tour);
    }

    @GetMapping
    public ResponseEntity<List<TourResponse>> getAllTours() {
        List<TourResponse> tours = tourService.getAllTours();
        return ResponseEntity.ok(tours);
    }
}
