package com.example.demo.DTOs;

public record ChangePasswordRequestDTO(
        String currentPassword,
        String newPassword
) {}