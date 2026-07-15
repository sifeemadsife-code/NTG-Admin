package com.example.demo.Services;

import com.example.demo.DTOs.CreateEngineerFeedbackRequestDTO;
import com.example.demo.DTOs.EngineerFeedbackResponseDTO;
import com.example.demo.entities.EngineerFeedback;
import com.example.demo.entities.Teacher;
import com.example.demo.entities.User;
import com.example.demo.repositories.EngineerFeedbackRepository;
import com.example.demo.repositories.TeacherRepository;
import com.example.demo.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EngineerFeedbackService {
    private final EngineerFeedbackRepository engineerFeedbackRepository;
    private final TeacherRepository teacherRepository;
    private final UserRepository userRepository;

    public List<EngineerFeedbackResponseDTO> getByTeacher(Long teacherId) {
        return engineerFeedbackRepository.findByTeacherId(teacherId).stream()
                .map(this::toResponse).toList();
    }

    @Transactional
    public EngineerFeedbackResponseDTO create(CreateEngineerFeedbackRequestDTO request) {
        User user = userRepository.findById(request.userId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Teacher teacher = teacherRepository.findById(request.teacherId())
                .orElseThrow(() -> new RuntimeException("Engineer not found"));

        EngineerFeedback feedback = new EngineerFeedback();
        feedback.setId(engineerFeedbackRepository.getNextId());
        feedback.setUser(user);
        feedback.setTeacher(teacher);
        feedback.setFeedbackDate(request.feedbackDate());
        feedback.setFeedback(request.feedback());
        feedback.setNotes(request.notes());
        feedback.setRate(request.rate() != null ? request.rate() : 0f);

        EngineerFeedback saved = engineerFeedbackRepository.save(feedback);
        return toResponse(saved);
    }

    @Transactional
    public void delete(Long id) {
        if (!engineerFeedbackRepository.existsById(id)) {
            throw new RuntimeException("Feedback not found");
        }
        engineerFeedbackRepository.deleteById(id);
    }
    public long getCountByTeacher(Long teacherId) {
        return engineerFeedbackRepository.countByTeacherId(teacherId);
    }

    private EngineerFeedbackResponseDTO toResponse(EngineerFeedback f) {
        return new EngineerFeedbackResponseDTO(
                f.getId(),
                f.getFeedbackDate(),
                f.getFeedback(),
                f.getNotes(),
                f.getUser().getFirstName(),
                f.getUser().getLastName()
        );
    }
}