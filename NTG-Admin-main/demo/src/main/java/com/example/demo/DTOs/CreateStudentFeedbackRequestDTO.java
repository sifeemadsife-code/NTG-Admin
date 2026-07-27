package com.example.demo.DTOs;

import java.time.LocalDate;

public record CreateStudentFeedbackRequestDTO(
        Long studentId,
        Long userId,
        LocalDate feedbackDate,
        String performanceNotes,
        String behaviorNotes,
        String recommendations
) {}