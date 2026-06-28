package com.example.demo.repositories;

import com.example.demo.entities.TrainingProgram;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TrainingProgramRepository extends JpaRepository<TrainingProgram, Long> {
    List<TrainingProgram> findByTeacherId(Long teacherId);
    List<TrainingProgram> findByUserId(Long userId);
}