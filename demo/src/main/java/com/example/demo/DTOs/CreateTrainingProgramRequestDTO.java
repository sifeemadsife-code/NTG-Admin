package com.example.demo.DTOs;

import java.time.LocalDate;

public record CreateTrainingProgramRequestDTO (
        Long teacherId,
        Long userId,
        Long gradeId,
        String programName,
        String description,
        LocalDate startDate,
        LocalDate endDate,
        String location
){}