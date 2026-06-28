package com.example.demo.DTOs;

public record TeacherProfileDTO(
        Long id,
        String firstName,
        String lastName,
        String email,
        String address,
        String education,
        String employmentHistory,
        Long numberOfYearsOfExperience
) {}