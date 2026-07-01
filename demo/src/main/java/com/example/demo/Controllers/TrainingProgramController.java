package com.example.demo.Controllers;

import com.example.demo.DTOs.CreateTrainingProgramRequestDTO;
import com.example.demo.DTOs.TrainingProgramResponseDTO;
import com.example.demo.DTOs.UpdateTrainingProgramRequestDTO;
import com.example.demo.Services.TrainingProgramService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/training-programs")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class TrainingProgramController {

    private final TrainingProgramService trainingProgramService;
    @GetMapping("/{id}")
    public TrainingProgramResponseDTO getTrainingProgramById(@PathVariable Long id) {
        return trainingProgramService.getTrainingProgramById(id);
    }
}