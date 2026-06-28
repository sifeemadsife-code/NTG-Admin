package com.example.demo.repositories;

import com.example.demo.entities.Mark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MarkRepository extends JpaRepository<Mark, Long> {
    @Query("select count(distinct m.user.id) from Mark m where m.course.teacher.id = :teacherId")
    long countDistinctStudentsByTeacherId(Long teacherId);
}
