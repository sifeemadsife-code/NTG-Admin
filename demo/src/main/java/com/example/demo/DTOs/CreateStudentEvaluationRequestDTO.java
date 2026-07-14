package com.example.demo.DTOs;

import java.time.LocalDate;

public record CreateStudentEvaluationRequestDTO(
        Long studentId,
        Long userId,
        LocalDate evaluationDate,
        Long score,
        String evaluationText,
        String evaluationNote
) {}