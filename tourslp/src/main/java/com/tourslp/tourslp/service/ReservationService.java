package com.tourslp.tourslp.service;


import com.tourslp.tourslp.dto.AvailabilityResponse;
import com.tourslp.tourslp.dto.ReservationRequest;
import com.tourslp.tourslp.dto.ReservationResponse;
import com.tourslp.tourslp.entity.Reservation;
import com.tourslp.tourslp.entity.User;
import com.tourslp.tourslp.repository.IReservationRepository;
import com.tourslp.tourslp.repository.IUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final IReservationRepository reservationRepository;
    private final IUserRepository userRepository;

    /**
     * Crear una reserva
     */
    public ReservationResponse createReservation(String email, ReservationRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (reservationRepository.existsByDate(request.getDate())) {
            throw new RuntimeException("Ya hay una reserva para este día");
        }

        Reservation reservation = Reservation.builder()
                .date(request.getDate())
                .description(request.getDescription())
                .user(user)
                .build();

        reservation = reservationRepository.save(reservation);

        return new ReservationResponse(
                reservation.getId(),
                reservation.getDate(),
                reservation.getDescription()
        );
    }

    /**
     * Obtener las reservas de un usuario
     */
    public List<ReservationResponse> getUserReservations(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return reservationRepository.findByUser(user).stream()
                .map(r -> new ReservationResponse(
                        r.getId(),
                        r.getDate(),
                        r.getDescription()
                ))
                .toList();
    }

    /**
     * Cancelar una reserva si faltan más de 24 horas
     */
    public void cancelReservation(Long reservationId, String email) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));

        if (!reservation.getUser().getEmail().equals(email)) {
            throw new RuntimeException("No puedes cancelar una reserva que no es tuya");
        }

        if (reservation.getDate().isBefore(LocalDate.now().plusDays(1))) {
            throw new RuntimeException("La reserva solo se puede cancelar hasta 24 horas antes");
        }

        reservationRepository.delete(reservation);
    }

    /**
     * Obtener todas las reservas (solo admin)
     */
    public List<ReservationResponse> getAllReservations() {
        return reservationRepository.findAll().stream()
                .map(r -> new ReservationResponse(
                        r.getId(),
                        r.getDate(),
                        r.getDescription()
                ))
                .toList();
    }

    /**
     * Obtener disponibilidad de fechas para un mes y año específico
     */
    public AvailabilityResponse getAvailability(int year, int month) {
        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());

        List<LocalDate> reservedDates = reservationRepository.findAll().stream()
                .map(Reservation::getDate)
                .filter(date -> !date.isBefore(start) && !date.isAfter(end))
                .toList();

        List<LocalDate> allDatesInMonth = start.datesUntil(end.plusDays(1)).toList();

        List<LocalDate> availableDates = allDatesInMonth.stream()
                .filter(date -> !reservedDates.contains(date))
                .toList();

        return new AvailabilityResponse(availableDates, reservedDates);
    }
}
