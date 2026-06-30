package com.example.demo.Services;

import com.example.demo.DTOs.StudentDTO;
import com.example.demo.entities.Student;
import com.example.demo.repositories.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;
    public Optional<Student> findByUserId(Long userId) {
        return studentRepository.findByUserId(userId);
    }
    public List<StudentDTO> findAllStudents() {
        return studentRepository.findAll().stream().map(s -> new StudentDTO(
                s.getId(),
                s.getUser().getFirstName(),
                s.getUser().getLastName(),
                s.getStudentClass() != null && s.getStudentClass().getGrade() != null
                        ? s.getStudentClass().getGrade().getName()
                        : null,
                s.getUser().getIsdeleted()
        )).toList();
    }
}
