// demo/src/main/java/com/example/demo/Controllers/StudentController.java
package com.example.demo.Controllers;

import com.example.demo.DTOs.StudentDTO;
import com.example.demo.DTOs.StudentDetailsDTO;
import com.example.demo.Services.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;

    @GetMapping
    public List<StudentDTO> getAllStudents() {
        return studentService.findAllStudents();
    }

    @GetMapping("/count")
    public Long countStudents() {
        return studentService.countStudents();
    }

    @GetMapping("/{id}/details")
    public StudentDetailsDTO getStudentDetails(@PathVariable Long id) {
        return studentService.getStudentDetails(id);
    }
}