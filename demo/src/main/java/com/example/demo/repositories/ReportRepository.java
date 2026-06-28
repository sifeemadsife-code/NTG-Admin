package com.example.demo.repositories;

import com.example.demo.entities.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByUserId(Long userId);
    List<Report> findBySentToId(Long sentToId);
}