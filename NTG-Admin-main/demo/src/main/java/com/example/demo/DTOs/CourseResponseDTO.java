package com.example.demo.DTOs;

public record CourseResponseDTO(
        Long id,
        Long teacherId,
        String teacherFirstName,
        String teacherLastName,
        Long termId,
        String courseType,
        String courseName,
        String description,
        String studyPlan
) {}