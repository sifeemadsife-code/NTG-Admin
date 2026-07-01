package com.example.demo.DTOs;

import java.time.LocalDate;

public record UpdateTrainingProgramRequestDTO(
        String programName,
        String description,
        LocalDate startDate,
        LocalDate endDate,
        String location
) {}