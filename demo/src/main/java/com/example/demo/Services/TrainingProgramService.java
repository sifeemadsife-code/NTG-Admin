package com.example.demo.Services;

import com.example.demo.DTOs.TrainingProgramResponseDTO;
import com.example.demo.entities.TrainingProgram;
import com.example.demo.repositories.TeacherRepository;
import com.example.demo.repositories.TrainingProgramRepository;
import com.example.demo.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TrainingProgramService {

    private final TrainingProgramRepository trainingProgramRepository;

    public TrainingProgramResponseDTO getTrainingProgramById(Long id) {
        var program = trainingProgramRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("program not found"));
        return new TrainingProgramResponseDTO(
                program.getId(),
                program.getTeacher().getId(),
                program.getTeacher().getUser().getFirstName(),
                program.getTeacher().getUser().getLastName(),
                program.getProgramName(),
                program.getDescription(),
                program.getStartDate(),
                program.getEndDate(),
                program.getLocation(),
                program.getCreatedAt(),
                trainingProgramRepository.countStudentsByTeacherId(program.getTeacher().getId())
        );
    }
}