package com.example.demo.DTOs;

import java.time.LocalDate;

public record TeacherProfileDTO(
        Long id,
        String firstName,
        String lastName,
        String email,
        String address,
        String education,
        String employmentHistory,
        Long numberOfYearsOfExperience,
        LocalDate birthDate,
        Character gender,
        String religion,
        Long nationalNumber,
        boolean status
) {}