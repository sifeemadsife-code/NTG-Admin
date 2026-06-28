package com.example.demo.DTOs;

public record CreateEngineerRequestDTO(
        String firstName,
        String lastName,
        String email,
        String password,
        String education,
        String employmentHistory,
        Long numberOfYearsOfExperience
) {}