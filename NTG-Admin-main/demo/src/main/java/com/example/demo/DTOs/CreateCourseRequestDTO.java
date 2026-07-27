package com.example.demo.DTOs;

public record CreateCourseRequestDTO(
        Long teacherId,
        Long termId,
        String courseName,
        String description,
        String studyPlan
) {}