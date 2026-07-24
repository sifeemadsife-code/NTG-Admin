package com.example.demo.DTOs;

import java.time.LocalDate;

public record NotificationResponseDTO(
        Long id,
        String title,
        String type,
        String priority,
        String body,
        LocalDate sentAt,
        Long senderId,
        String senderFirstName,
        String senderLastName,
        Long sentToId,
        String sentToFirstName,
        String sentToLastName
) {}