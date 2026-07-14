package com.example.demo.Controllers;

import com.example.demo.DTOs.CreateStudentFeedbackRequestDTO;
import com.example.demo.DTOs.StudentFeedbackResponseDTO;
import com.example.demo.Services.StudentFeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student-feedback")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class StudentFeedbackController {

    private final StudentFeedbackService studentFeedbackService;

    @GetMapping
    public List<StudentFeedbackResponseDTO> getAll() {
        return studentFeedbackService.getAll();
    }

    @GetMapping("/student/{studentId}")
    public List<StudentFeedbackResponseDTO> getByStudent(@PathVariable Long studentId) {
        return studentFeedbackService.getByStudent(studentId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public StudentFeedbackResponseDTO create(@RequestBody CreateStudentFeedbackRequestDTO request) {
        return studentFeedbackService.create(request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        studentFeedbackService.delete(id);
    }
}