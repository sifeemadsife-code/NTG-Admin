package com.example.demo.Controllers;

import com.example.demo.DTOs.CreateEngineerFeedbackRequestDTO;
import com.example.demo.DTOs.EngineerFeedbackResponseDTO;
import com.example.demo.Services.EngineerFeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/engineer-feedback")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class EngineerFeedbackController {

    private final EngineerFeedbackService engineerFeedbackService;

    @GetMapping("/teacher/{teacherId}")
    public List<EngineerFeedbackResponseDTO> getByTeacher(@PathVariable Long teacherId) {
        return engineerFeedbackService.getByTeacher(teacherId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EngineerFeedbackResponseDTO create(@RequestBody CreateEngineerFeedbackRequestDTO request) {
        return engineerFeedbackService.create(request);
    }
    @GetMapping("/teacher/{teacherId}/count")
    public long getCountByTeacher(@PathVariable Long teacherId) {
        return engineerFeedbackService.getCountByTeacher(teacherId);
    }   
}