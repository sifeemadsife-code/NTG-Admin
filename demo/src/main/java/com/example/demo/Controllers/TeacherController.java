package com.example.demo.Controllers;

import com.example.demo.DTOs.CreateEngineerRequestDTO;
import com.example.demo.DTOs.EngineerCardsDTO;
import com.example.demo.DTOs.EngineerFeedbackResponseDTO;
import com.example.demo.DTOs.TeacherListDTO;
import com.example.demo.DTOs.TeacherProfileDTO;
import com.example.demo.Services.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teachers")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class TeacherController {

    private final TeacherService teacherService;

    @GetMapping
    public List<TeacherListDTO> getAllTeachers() {
        return teacherService.getAllTeachers();
    }

    @GetMapping("/{id}")
    public TeacherProfileDTO getTeacherProfile(@PathVariable Long id) {
        return teacherService.getTeacherProfile(id);
    }

    @GetMapping("/{id}/feedback")
    public List<EngineerFeedbackResponseDTO> getTeacherFeedback(@PathVariable Long id) {
        return teacherService.getTeacherFeedback(id);
    }

    @GetMapping("/{id}/dashboard")
    public EngineerCardsDTO getEngineerCards(@PathVariable Long id) {
        return teacherService.getEngineerCards(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TeacherProfileDTO createEngineer(@RequestBody CreateEngineerRequestDTO request) {
        return teacherService.createEngineer(request);
    }
}