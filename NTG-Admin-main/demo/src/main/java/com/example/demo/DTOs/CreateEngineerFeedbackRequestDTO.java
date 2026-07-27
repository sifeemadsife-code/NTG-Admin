package com.example.demo.DTOs;

import java.time.LocalDate;

public record CreateEngineerFeedbackRequestDTO(
        Long userId,
        Long teacherId,
        LocalDate feedbackDate,
        String feedback,
        String notes,
        Float rate
) {}