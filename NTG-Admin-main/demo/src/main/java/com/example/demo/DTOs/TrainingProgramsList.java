package com.example.demo.DTOs;

import java.time.LocalDate;

public record TrainingProgramsList (
        Long id,
        String program_name,
        String grade_name,
        Long total_students,
        String duration,
        LocalDate start_date
){}