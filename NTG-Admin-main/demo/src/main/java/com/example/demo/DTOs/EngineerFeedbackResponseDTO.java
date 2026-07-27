package com.example.demo.DTOs;

import java.time.LocalDate;

public record EngineerFeedbackResponseDTO(
        Long id,
        LocalDate feedbackDate,
        String feedback,
        String notes,
        String byUserFirstName,
        String byUserLastName
) {}