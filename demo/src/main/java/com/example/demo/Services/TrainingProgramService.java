package com.example.demo.Services;

import com.example.demo.DTOs.CreateTrainingProgramRequestDTO;
import com.example.demo.DTOs.TrainingProgramResponseDTO;
import com.example.demo.DTOs.TrainingProgramsList;
import com.example.demo.DTOs.UpdateTrainingProgramRequestDTO;
import com.example.demo.entities.Teacher;
import com.example.demo.entities.TrainingProgram;
import com.example.demo.entities.User;
import com.example.demo.repositories.TeacherRepository;
import com.example.demo.repositories.TrainingProgramRepository;
import com.example.demo.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.time.temporal.ChronoUnit;
@Service
@RequiredArgsConstructor
public class TrainingProgramService {

    private final TrainingProgramRepository trainingProgramRepository;
    private final UserRepository userRepository;
    private final TeacherRepository teacherRepository;

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
    public static String calculateDurationInWeeks(LocalDate startDate, LocalDate endDate) {
        if (startDate == null || endDate == null) {
            return "N/A";
        }
        long days = ChronoUnit.DAYS.between(startDate, endDate);
        long weeks = days / 7;
        long remainingDays = days % 7;

        if (remainingDays == 0) {
            return weeks + " Weeks";
        }
        long roundedWeeks = Math.round(days / 7.0);
        return roundedWeeks + " Weeks";
    }
    public List<TrainingProgramsList>  getTrainingPrograms(){
        return trainingProgramRepository.findAll().stream().map(p -> new TrainingProgramsList(
                p.getId(),
                p.getProgramName(),
                trainingProgramRepository.countStudentsByTeacherId(p.getTeacher().getId()),
                calculateDurationInWeeks(p.getStartDate(), p.getEndDate()),
                p.getStartDate()
        )).toList();
    }
    public Long getTrainingProgramsCount(){
        return trainingProgramRepository.count();
    }
    @Transactional
    public TrainingProgramResponseDTO createTrainingProgram(CreateTrainingProgramRequestDTO request) {
        Teacher teacher = teacherRepository.findById(request.teacherId())
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        User user = userRepository.findById(request.userId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        TrainingProgram program = new TrainingProgram();
        program.setTeacher(teacher);
        program.setUser(user);
        program.setProgramName(request.programName());
        program.setDescription(request.description());
        program.setStartDate(request.startDate());
        program.setEndDate(request.endDate());
        program.setLocation(request.location());
        program.setCreatedAt(Instant.now());
        TrainingProgram saved = trainingProgramRepository.save(program);
        return toResponse(saved);
    }
    private TrainingProgramResponseDTO toResponse(TrainingProgram program) {
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
    @Transactional
    public void deleteTrainingProgram(Long id) {
        if (!trainingProgramRepository.existsById(id)) {
            throw new RuntimeException("program not found");
        }
        trainingProgramRepository.deleteById(id);
    }
    @Transactional
    public TrainingProgramResponseDTO updateTrainingProgram(Long id, UpdateTrainingProgramRequestDTO request) {
        TrainingProgram program = trainingProgramRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("program not found"));

        program.setProgramName(request.programName());
        program.setDescription(request.description());
        program.setStartDate(request.startDate());
        program.setEndDate(request.endDate());
        program.setLocation(request.location());

        TrainingProgram saved = trainingProgramRepository.save(program);
        return toResponse(saved);
    }
}