package com.example.demo.DTOs;

import java.util.List;

public record CreateNotificationRequestDTO(
        Long userId,
        String title,
        String type,
        String priority,
        String body,
        List<Long> sentToIds
) {}