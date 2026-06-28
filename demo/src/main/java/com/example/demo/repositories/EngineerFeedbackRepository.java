package com.example.demo.repositories;

import com.example.demo.entities.EngineerFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EngineerFeedbackRepository extends JpaRepository<EngineerFeedback, Long> {
    List<EngineerFeedback> findByTeacherId(Long teacherId);
}