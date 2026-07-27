// demo/src/main/java/com/example/demo/repositories/StudentRepository.java
package com.example.demo.repositories;

import com.example.demo.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByUserId(Long userId);
    List<Student> findByStudentClass_Grade_Id(Long gradeId);

    @Query("SELECT s FROM Student s JOIN FETCH s.user u JOIN FETCH u.role " +
            "LEFT JOIN FETCH s.studentClass c LEFT JOIN FETCH c.grade WHERE s.id = :id")
    Optional<Student> findDetailsById(@Param("id") Long id);

    @Query("SELECT s.id FROM Student s WHERE s.studentClass.id = :classId")
    List<Long> findIdsByClassId(@Param("classId") Long classId);
}