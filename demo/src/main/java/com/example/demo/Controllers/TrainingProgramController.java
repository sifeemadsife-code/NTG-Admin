package com.example.demo.Controllers;

import com.example.demo.DTOs.*;
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
    @GetMapping
    public List<TrainingProgramsList> getTrainingPrograms(){
        return trainingProgramService.getTrainingPrograms();
    }
    @GetMapping("/{id}")
    public TrainingProgramResponseDTO getTrainingProgramById(@PathVariable Long id) {
        return trainingProgramService.getTrainingProgramById(id);
    }
    @GetMapping("/count")
    public Long count(){
        return trainingProgramService.getTrainingProgramsCount();
    }
    // NEW: students belonging to this program's grade
    @GetMapping("/{id}/students")
    public List<StudentDTO> getProgramStudents(@PathVariable Long id) {
        return trainingProgramService.getStudentsInProgram(id);
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TrainingProgramResponseDTO createTrainingProgram(@RequestBody CreateTrainingProgramRequestDTO request) {
        return trainingProgramService.createTrainingProgram(request);
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTrainingProgram(@PathVariable Long id) {
        trainingProgramService.deleteTrainingProgram(id);
    }
    @PutMapping("/{id}")
    public TrainingProgramResponseDTO updateTrainingProgram(@PathVariable Long id,
                                                            @RequestBody UpdateTrainingProgramRequestDTO request) {
        return trainingProgramService.updateTrainingProgram(id, request);
    }
}