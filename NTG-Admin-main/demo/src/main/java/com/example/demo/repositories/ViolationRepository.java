package com.example.demo.repositories;

import com.example.demo.entities.Violation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ViolationRepository extends JpaRepository<Violation, Long> {
    long countByStudentId(Long studentId);
}