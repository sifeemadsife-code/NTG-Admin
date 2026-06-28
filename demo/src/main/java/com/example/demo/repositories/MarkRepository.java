package com.example.demo.repositories;

import com.example.demo.entities.Mark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MarkRepository extends JpaRepository<Mark, Long> {

    @Query("SELECT COUNT(DISTINCT m.user.id) FROM Mark m WHERE m.course.teacher.id = :teacherId")
    long countDistinctStudentsByTeacherId(@Param("teacherId") Long teacherId);
}