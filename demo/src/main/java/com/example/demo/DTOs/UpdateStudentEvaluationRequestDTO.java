package com.example.demo.DTOs;

import java.time.LocalDate;

public record UpdateStudentEvaluationRequestDTO (
        Long score,
        String evaluationText,
        String evaluationNote
) {}