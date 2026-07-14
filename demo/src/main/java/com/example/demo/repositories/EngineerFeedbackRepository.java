package com.example.demo.repositories;

import com.example.demo.entities.EngineerFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EngineerFeedbackRepository extends JpaRepository<EngineerFeedback, Long> {

    List<EngineerFeedback> findByTeacherId(Long teacherId);

    long countByTeacherId(Long teacherId);

    @Query("SELECT AVG(f.rate) FROM EngineerFeedback f WHERE f.teacher.id = :teacherId AND f.rate IS NOT NULL")
    Double findAverageRateByTeacherId(@Param("teacherId") Long teacherId);

    @Query("SELECT COALESCE(MAX(f.id), 0) + 1 FROM EngineerFeedback f")
    Long getNextId();
}