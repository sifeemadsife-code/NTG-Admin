package com.example.demo.repositories;

import com.example.demo.entities.StudentEvaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StudentEvaluationRepository extends JpaRepository<StudentEvaluation, Long> {
    List<StudentEvaluation> findByStudentIdOrderByEvaluationDateDesc(Long studentId);

    @Query("SELECT COALESCE(MAX(e.id), 0) + 1 FROM StudentEvaluation e")
    Long getNextId();
}