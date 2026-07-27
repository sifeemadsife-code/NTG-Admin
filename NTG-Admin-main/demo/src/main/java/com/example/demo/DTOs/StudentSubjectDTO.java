package com.example.demo.DTOs;

public record StudentSubjectDTO(
        String subjectName,
        Double midterm,
        Double finalScore,
        Double total
) {}