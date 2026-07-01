package com.example.demo.DTOs;

import java.time.Instant;
import java.time.LocalDate;

public record TrainingProgramResponseDTO(
        Long id,
        Long teacherId,
        String teacherFirstName,
        String teacherLastName,
        String programName,
        String description,
        LocalDate startDate,
        LocalDate endDate,
        String location,
        Instant createdAt,
        Number totalStudents
) {}