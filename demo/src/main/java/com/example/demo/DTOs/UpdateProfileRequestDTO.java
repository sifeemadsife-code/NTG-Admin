package com.example.demo.DTOs;

import java.time.LocalDate;

public record UpdateProfileRequestDTO(
        String firstName,
        String lastName,
        String firstNameInArabic,
        String lastNameInArabic,
        String email,
        String address,
        Character gender,
        String nationality,
        LocalDate birthDate,
        String religion,
        Long nationalNumber
) {}