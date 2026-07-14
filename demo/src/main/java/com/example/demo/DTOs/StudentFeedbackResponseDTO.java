package com.example.demo.DTOs;

import java.time.LocalDate;

public record StudentFeedbackResponseDTO(
        Long id,
        Long studentId,
        String studentFirstName,
        String studentLastName,
        Long userId,
        String userFirstName,
        String userLastName,
        LocalDate feedbackDate,
        String performanceNotes,
        String behaviorNotes,
        String recommendations
) {}