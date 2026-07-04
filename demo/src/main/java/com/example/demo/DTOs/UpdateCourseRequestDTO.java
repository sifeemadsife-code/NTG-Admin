package com.example.demo.DTOs;

public record UpdateCourseRequestDTO(
        Long teacherId,
        Long termId,
        String courseName,
        String description,
        String studyPlan
) {}