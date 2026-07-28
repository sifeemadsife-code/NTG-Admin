package com.example.demo.DTOs;

import java.time.LocalDate;

public record StudentEvaluationResponseDTO(
        Long id,
        Long studentId,
        String studentFirstName,
        String studentLastName,
        Long userId,
        String userFirstName,
        String userLastName,
        Long trainingProgramId,
        String trainingProgramName,
        LocalDate evaluationDate,
        Long score,
        String evaluationText,
        String evaluationNote
) {}