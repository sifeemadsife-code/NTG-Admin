package com.example.demo.DTOs;

import java.time.LocalDate;

public record AdminProfileResponseDTO(
        Long id,
        String firstName,
        String lastName,
        String firstNameInArabic,
        String lastNameInArabic,
        String email,
        String address,
        Boolean isdeleted,
        String createdAt,
        LocalDate lastLogin,
        Character gender,
        String nationality,
        LocalDate birthDate,
        String religion,
        Long nationalNumber,
        Long roleId,
        String roleName
) {}