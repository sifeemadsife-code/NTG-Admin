package com.example.demo.DTOs;

public record UserListDTO(
        Long id,
        String firstName,
        String lastName,
        String email,
        String roleName
) {}