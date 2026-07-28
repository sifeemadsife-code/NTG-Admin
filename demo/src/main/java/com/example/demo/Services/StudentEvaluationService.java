package com.example.demo.Services;

import com.example.demo.DTOs.CreateStudentEvaluationRequestDTO;
import com.example.demo.DTOs.StudentEvaluationResponseDTO;
import com.example.demo.entities.Student;
import com.example.demo.entities.StudentEvaluation;
import com.example.demo.entities.TrainingProgram;
import com.example.demo.entities.User;
import com.example.demo.repositories.StudentEvaluationRepository;
import com.example.demo.repositories.StudentRepository;
import com.example.demo.repositories.TrainingProgramRepository;
import com.example.demo.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentEvaluationService {
    private final StudentEvaluationRepository studentEvaluationRepository;
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final TrainingProgramRepository trainingProgramRepository;

    public List<StudentEvaluationResponseDTO> getAll() {
        return studentEvaluationRepository.findAll().stream().map(this::toResponse).toList();
    }

    public List<StudentEvaluationResponseDTO> getByStudent(Long studentId) {
        return studentEvaluationRepository.findByStudentIdOrderByEvaluationDateDesc(studentId)
                .stream().map(this::toResponse).toList();
    }

    // NEW: list evaluations that were created under a specific training program
    public List<StudentEvaluationResponseDTO> getByTrainingProgram(Long trainingProgramId) {
        return studentEvaluationRepository.findByTrainingProgramIdOrderByEvaluationDateDesc(trainingProgramId)
                .stream().map(this::toResponse).toList();
    }

    @Transactional
    public StudentEvaluationResponseDTO create(CreateStudentEvaluationRequestDTO request) {
        if (request.trainingProgramId() == null) {
            throw new RuntimeException("Evaluation must be linked to a training program");
        }

        Student student = studentRepository.findById(request.studentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        User user = userRepository.findById(request.userId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        TrainingProgram trainingProgram = trainingProgramRepository.findById(request.trainingProgramId())
                .orElseThrow(() -> new RuntimeException("Training program not found"));

        StudentEvaluation evaluation = new StudentEvaluation();
        evaluation.setId(studentEvaluationRepository.getNextId());
        evaluation.setStudent(student);
        evaluation.setUser(user);
        evaluation.setTrainingProgram(trainingProgram);
        evaluation.setEvaluationDate(request.evaluationDate());
        evaluation.setScore(request.score());
        evaluation.setEvaluationText(request.evaluationText());
        evaluation.setEvaluationNote(request.evaluationNote());

        StudentEvaluation saved = studentEvaluationRepository.save(evaluation);
        return toResponse(saved);
    }

    @Transactional
    public void delete(Long id) {
        if (!studentEvaluationRepository.existsById(id)) {
            throw new RuntimeException("Evaluation not found");
        }
        studentEvaluationRepository.deleteById(id);
    }

    private StudentEvaluationResponseDTO toResponse(StudentEvaluation e) {
        return new StudentEvaluationResponseDTO(
                e.getId(),
                e.getStudent().getId(),
                e.getStudent().getUser().getFirstName(),
                e.getStudent().getUser().getLastName(),
                e.getUser().getId(),
                e.getUser().getFirstName(),
                e.getUser().getLastName(),
                e.getTrainingProgram() != null ? e.getTrainingProgram().getId() : null,
                e.getTrainingProgram() != null ? e.getTrainingProgram().getProgramName() : null,
                e.getEvaluationDate(),
                e.getScore(),
                e.getEvaluationText(),
                e.getEvaluationNote()
        );
    }
}