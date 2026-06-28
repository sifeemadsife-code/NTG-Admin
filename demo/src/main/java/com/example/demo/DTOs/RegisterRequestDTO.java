package com.example.demo.DTOs;

public record RegisterRequestDTO(
        String firstName,
        String lastName,
        String email,
        String password,
        Long roleId
) {}