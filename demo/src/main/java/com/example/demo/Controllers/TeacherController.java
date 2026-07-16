package com.example.demo.Controllers;

import com.example.demo.DTOs.*;
import com.example.demo.Services.TeacherService;
import com.example.demo.entities.Teacher;
import com.example.demo.entities.User;
import com.example.demo.repositories.TeacherRepository;
import com.example.demo.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teachers")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class TeacherController {

    private final TeacherService teacherService;
    private final UserRepository userRepository;
    private final TeacherRepository teacherRepository;

    @GetMapping
    public List<TeacherListDTO> getAllTeachers() {
        return teacherService.getAllTeachers();
    }

    @GetMapping("/count")
    public Long countAllTeachers() {
        return teacherRepository.count();
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
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEngineer(@PathVariable Long id) {
        teacherService.deleteEngineer(id);
    }
    @PutMapping("/restore/{id}")
    public ResponseEntity<String> restoreEngineer(@PathVariable Long id) {
        teacherService.restoreEngineer(id);
        return ResponseEntity.ok("Engineer restored successfully");
    }
    @PutMapping("/{id}")
    public TeacherProfileDTO updateEngineer(@RequestBody UpdateEngineerRequestDTO request, @PathVariable Long id) {
        return teacherService.updateEngineer(id, request);
    }
}