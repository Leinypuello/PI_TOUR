package com.tourslp.tourslp.service;


import com.tourslp.tourslp.dto.TourRequest;
import com.tourslp.tourslp.dto.TourResponse;
import com.tourslp.tourslp.entity.Tour;
import com.tourslp.tourslp.repository.ITourRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TourService {

    private final ITourRepository tourRepository;

    public Tour save(TourRequest request) {
        if (tourRepository.existsByName(request.getName())) {
            throw new IllegalArgumentException("Ya existe un tour con ese nombre.");
        }

        Tour tour = Tour.builder()
                .name(request.getName())
                .description(request.getDescription())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .durationDays(request.getDurationDays())
                .imageUrls(request.getImageUrls())
                .build();

        return tourRepository.save(tour);
    }

    public List<TourResponse> getAllTours() {
        List<Tour> tours = tourRepository.findAll();
        return tours.stream()
                .map(t -> TourResponse.builder()
                        .id(t.getId())
                        .name(t.getName())
                        .description(t.getDescription())
                        .startDate(t.getStartDate())
                        .endDate(t.getEndDate())
                        .durationDays(t.getDurationDays())
                        .imageUrls(t.getImageUrls())
                        .build())
                .toList();
    }

}

