package com.example.demo.repositories;

import com.example.demo.entities.StudentFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StudentFeedbackRepository extends JpaRepository<StudentFeedback, Long> {
    List<StudentFeedback> findByStudentIdOrderByFeedbackDateDesc(Long studentId);

    @Query("SELECT COALESCE(MAX(f.id), 0) + 1 FROM StudentFeedback f")
    Long getNextId();
}