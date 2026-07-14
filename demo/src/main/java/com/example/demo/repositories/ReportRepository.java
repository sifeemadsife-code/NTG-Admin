package com.example.demo.repositories;

import com.example.demo.entities.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {
    long countByUserId(Long userId);
    long countBySentToId(Long userId);

    List<Report> findBySentToIdOrderByCreatedAtDesc(Long sentToId);
    List<Report> findByUserIdOrderByCreatedAtDesc(Long userId);

    @Query("SELECT COALESCE(MAX(r.id), 0) + 1 FROM Report r")
    Long getNextId();
}