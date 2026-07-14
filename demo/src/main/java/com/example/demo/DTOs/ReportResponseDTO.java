package com.example.demo.DTOs;

import java.time.LocalDate;

public record ReportResponseDTO(
        Long id,
        Long userId,
        String userFirstName,
        String userLastName,
        String content,
        String fileLink,
        LocalDate createdAt,
        Long sentToId,
        String sentToFirstName,
        String sentToLastName
) {}