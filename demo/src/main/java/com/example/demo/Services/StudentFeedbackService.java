package com.example.demo.Services;

import com.example.demo.DTOs.CreateStudentFeedbackRequestDTO;
import com.example.demo.DTOs.StudentFeedbackResponseDTO;
import com.example.demo.entities.Student;
import com.example.demo.entities.StudentFeedback;
import com.example.demo.entities.User;
import com.example.demo.repositories.StudentFeedbackRepository;
import com.example.demo.repositories.StudentRepository;
import com.example.demo.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentFeedbackService {
    private final StudentFeedbackRepository studentFeedbackRepository;
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;

    public List<StudentFeedbackResponseDTO> getAll() {
        return studentFeedbackRepository.findAll().stream().map(this::toResponse).toList();
    }

    public List<StudentFeedbackResponseDTO> getByStudent(Long studentId) {
        return studentFeedbackRepository.findByStudentIdOrderByFeedbackDateDesc(studentId)
                .stream().map(this::toResponse).toList();
    }

    @Transactional
    public StudentFeedbackResponseDTO create(CreateStudentFeedbackRequestDTO request) {
        Student student = studentRepository.findById(request.studentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        User user = userRepository.findById(request.userId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        StudentFeedback feedback = new StudentFeedback();
        feedback.setId(studentFeedbackRepository.getNextId());
        feedback.setStudent(student);
        feedback.setUser(user);
        feedback.setFeedbackDate(request.feedbackDate());
        feedback.setPerformanceNotes(request.performanceNotes());
        feedback.setBehaviorNotes(request.behaviorNotes());
        feedback.setRecommendations(request.recommendations());

        StudentFeedback saved = studentFeedbackRepository.save(feedback);
        return toResponse(saved);
    }

    @Transactional
    public void delete(Long id) {
        if (!studentFeedbackRepository.existsById(id)) {
            throw new RuntimeException("Feedback not found");
        }
        studentFeedbackRepository.deleteById(id);
    }

    private StudentFeedbackResponseDTO toResponse(StudentFeedback f) {
        return new StudentFeedbackResponseDTO(
                f.getId(),
                f.getStudent().getId(),
                f.getStudent().getUser().getFirstName(),
                f.getStudent().getUser().getLastName(),
                f.getUser().getId(),
                f.getUser().getFirstName(),
                f.getUser().getLastName(),
                f.getFeedbackDate(),
                f.getPerformanceNotes(),
                f.getBehaviorNotes(),
                f.getRecommendations()
        );
    }
}