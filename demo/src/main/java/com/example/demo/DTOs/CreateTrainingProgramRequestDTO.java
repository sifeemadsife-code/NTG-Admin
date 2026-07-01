package com.example.demo.DTOs;

import lombok.Data;

import java.time.LocalDate;

public record CreateTrainingProgramRequestDTO (
    Long teacherId,
    Long userId,
    String programName,
    String description,
    LocalDate startDate,
    LocalDate endDate,
    String location
){}
