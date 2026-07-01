package com.example.demo.repositories;

import com.example.demo.entities.TrainingProgram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TrainingProgramRepository extends JpaRepository<TrainingProgram, Long> {
    List<TrainingProgram> findByTeacherId(Long teacherId);
    List<TrainingProgram> findByUserId(Long userId);

    @Query("SELECT COALESCE(MAX(t.id), 0) + 1 FROM TrainingProgram t")
    Long getNextId();

    @Query("SELECT COUNT(DISTINCT m.user.id) FROM Mark m WHERE m.course.teacher.id = :teacherId")
    long countStudentsByTeacherId(@Param("teacherId") Long teacherId);
}