package com.example.demo.Controllers;

import com.example.demo.DTOs.CreateStudentEvaluationRequestDTO;
import com.example.demo.DTOs.StudentEvaluationResponseDTO;
import com.example.demo.Services.StudentEvaluationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student-evaluations")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class StudentEvaluationController {

    private final StudentEvaluationService studentEvaluationService;

    @GetMapping
    public List<StudentEvaluationResponseDTO> getAll() {
        return studentEvaluationService.getAll();
    }

    @GetMapping("/student/{studentId}")
    public List<StudentEvaluationResponseDTO> getByStudent(@PathVariable Long studentId) {
        return studentEvaluationService.getByStudent(studentId);
    }

    // NEW
    @GetMapping("/program/{trainingProgramId}")
    public List<StudentEvaluationResponseDTO> getByTrainingProgram(@PathVariable Long trainingProgramId) {
        return studentEvaluationService.getByTrainingProgram(trainingProgramId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public StudentEvaluationResponseDTO create(@RequestBody CreateStudentEvaluationRequestDTO request) {
        return studentEvaluationService.create(request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        studentEvaluationService.delete(id);
    }
}