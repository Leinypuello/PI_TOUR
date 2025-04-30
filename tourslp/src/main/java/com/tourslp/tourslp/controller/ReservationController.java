package com.tourslp.tourslp.controller;


import com.tourslp.tourslp.dto.AvailabilityResponse;
import com.tourslp.tourslp.dto.ReservationRequest;
import com.tourslp.tourslp.dto.ReservationResponse;
import com.tourslp.tourslp.entity.Reservation;
import com.tourslp.tourslp.entity.User;
import com.tourslp.tourslp.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {


    private final ReservationService reservationService;

    @PreAuthorize("hasRole('CLIENT')")
    @PostMapping
    public ResponseEntity<ReservationResponse> create(@RequestBody ReservationRequest request,
                                                      @AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        return ResponseEntity.ok(reservationService.createReservation(email, request));
    }

    @PreAuthorize("hasRole('CLIENT')")
    @GetMapping
    public ResponseEntity<List<ReservationResponse>> getMyReservations(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        return ResponseEntity.ok(reservationService.getUserReservations(email));
    }

    @PreAuthorize("hasRole('CLIENT')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> cancelReservation(@PathVariable Long id,
                                                    @AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        reservationService.cancelReservation(id, email);
        return ResponseEntity.ok("Reserva cancelada exitosamente");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<ReservationResponse>> getAllReservations() {
        return ResponseEntity.ok(reservationService.getAllReservations());
    }

    @GetMapping("/availability")
    public ResponseEntity<AvailabilityResponse> getAvailability(
            @RequestParam int year,
            @RequestParam int month) {
        return ResponseEntity.ok(reservationService.getAvailability(year, month));
    }

    @PreAuthorize("hasRole('CLIENT')")
    @GetMapping("/disabled-dates/{tourId}")
    public ResponseEntity<List<LocalDate>> getDisabledDates(@PathVariable Long tourId) {
        List<LocalDate> fechasOcupadas = reservationService.getDisabledDatesForTour(tourId);
        return ResponseEntity.ok(fechasOcupadas);
    }
}
