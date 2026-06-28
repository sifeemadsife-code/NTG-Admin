package com.example.demo.DTOs;
public record TeacherListDTO(
        Long id,
        String firstName,
        String lastName,
        String email
) {}