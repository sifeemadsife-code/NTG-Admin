package com.example.demo.Services;

import com.example.demo.DTOs.*;
import com.example.demo.entities.Grade;
import com.example.demo.entities.Teacher;
import com.example.demo.entities.TrainingProgram;
import com.example.demo.entities.User;
import com.example.demo.repositories.GradeRepository;
import com.example.demo.repositories.StudentRepository;
import com.example.demo.repositories.TeacherRepository;
import com.example.demo.repositories.TrainingProgramRepository;
import com.example.demo.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TrainingProgramService {

    private final TrainingProgramRepository trainingProgramRepository;
    private final UserRepository userRepository;
    private final TeacherRepository teacherRepository;
    private final GradeRepository gradeRepository;
    private final StudentRepository studentRepository;

    public TrainingProgramResponseDTO getTrainingProgramById(Long id) {
        var program = trainingProgramRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("program not found"));
        return toResponse(program);
    }

    public static String calculateDurationInWeeks(LocalDate startDate, LocalDate endDate) {
        if (startDate == null || endDate == null) {
            return "N/A";
        }
        long days = ChronoUnit.DAYS.between(startDate, endDate);
        long roundedWeeks = Math.round(days / 7.0);
        return roundedWeeks + " Weeks";
    }

    public List<TrainingProgramsList> getTrainingPrograms(){
        return trainingProgramRepository.findAll().stream().map(p -> new TrainingProgramsList(
                p.getId(),
                p.getProgramName(),
                p.getGrade() != null ? p.getGrade().getName() : null,
                trainingProgramRepository.countStudentsByTeacherId(p.getTeacher().getId()),
                calculateDurationInWeeks(p.getStartDate(), p.getEndDate()),
                p.getStartDate()
        )).toList();
    }

    public Long getTrainingProgramsCount(){
        return trainingProgramRepository.count();
    }

    // NEW: get all students belonging to this program's Grade
    public List<StudentDTO> getStudentsInProgram(Long programId) {
        TrainingProgram program = trainingProgramRepository.findById(programId)
                .orElseThrow(() -> new RuntimeException("program not found"));

        Long gradeId = program.getGrade().getId();

        return studentRepository.findByStudentClass_Grade_Id(gradeId).stream()
                .map(s -> new StudentDTO(
                        s.getId(),
                        s.getUser().getFirstName(),
                        s.getUser().getLastName(),
                        s.getStudentClass() != null && s.getStudentClass().getGrade() != null
                                ? s.getStudentClass().getGrade().getName()
                                : null,
                        s.getUser().getIsdeleted()
                ))
                .toList();
    }

    @Transactional
    public TrainingProgramResponseDTO createTrainingProgram(CreateTrainingProgramRequestDTO request) {
        Teacher teacher = teacherRepository.findById(request.teacherId())
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        User user = userRepository.findById(request.userId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Grade grade = gradeRepository.findById(request.gradeId())
                .orElseThrow(() -> new RuntimeException("Grade not found"));

        TrainingProgram program = new TrainingProgram();
        program.setTeacher(teacher);
        program.setUser(user);
        program.setGrade(grade);
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
                program.getGrade() != null ? program.getGrade().getId() : null,
                program.getGrade() != null ? program.getGrade().getName() : null,
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