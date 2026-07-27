package com.example.demo.DTOs;

import com.example.demo.entities.Grade;

public record StudentDTO(
        Long id,
        String first_name,
        String last_name,
        String grade,
        boolean status
){}
