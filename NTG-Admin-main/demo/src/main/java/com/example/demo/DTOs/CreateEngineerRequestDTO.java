package com.example.demo.DTOs;

import java.time.LocalDate;

public record CreateEngineerRequestDTO(
        String firstName,
        String lastName,
        String firstNameInArabic,
        String lastNameInArabic,
        String email,
        String password,
        String address,
        Character gender,
        String nationality,
        LocalDate birthDate,
        Long nationalNumber,
        String religion,
        String education,
        String employmentHistory,
        Long numberOfYearsOfExperience
) {}