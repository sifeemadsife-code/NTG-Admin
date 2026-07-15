package com.example.demo.DTOs;

import java.util.List;

public record StudentDetailsDTO(
        Long id,
        String firstName,
        String lastName,
        String email,
        String grade,
        Long studentNumber,
        Double attendanceRate,
        Long assignmentsDone,
        Long violationsCount,
        Long classRank,
        List<StudentSubjectDTO> subjects
) {}