package com.tourslp.tourslp.repository;

import com.tourslp.tourslp.entity.Tour;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITourRepository extends JpaRepository<Tour,Long> {

    boolean existsByName(String name);
}
