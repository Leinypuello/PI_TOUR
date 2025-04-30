package com.tourslp.tourslp.repository;

import com.tourslp.tourslp.entity.Reservation;
import com.tourslp.tourslp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface IReservationRepository extends JpaRepository<Reservation,Long> {

    List<Reservation> findByUser(User user);
    boolean existsByDate(LocalDate date);
    List<Reservation> findByTourId(Long tourId);

}
