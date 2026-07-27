package com.example.demo.DTOs;

public record CreateReportRequestDTO(
        Long userId,
        String content,
        String fileLink,
        Long sentToId
) {}