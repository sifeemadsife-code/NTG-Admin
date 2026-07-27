// demo/src/main/java/com/example/demo/repositories/MarkRepository.java
package com.example.demo.repositories;

import com.example.demo.entities.Mark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MarkRepository extends JpaRepository<Mark, Long> {

    @Query("SELECT COUNT(DISTINCT m.user.id) FROM Mark m WHERE m.course.teacher.id = :teacherId")
    long countDistinctStudentsByTeacherId(@Param("teacherId") Long teacherId);

    @Query("SELECT m FROM Mark m JOIN FETCH m.course JOIN FETCH m.type WHERE m.user.id = :userId")
    List<Mark> findByUserIdWithCourseAndType(@Param("userId") Long userId);
}