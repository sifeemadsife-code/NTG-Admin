package com.example.demo.DTOs;

public record AuthResponseDTO(
        Long userId,
        String firstName,
        String lastName,
        String email,
        String role
) {}