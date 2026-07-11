package com.example.demo.DTOs;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDTO {

    private Integer totalStudents;
    private Double totalStudentsChange;
    private Integer totalEngineers;
    private Double totalEngineersChange;
    private Integer trainingPrograms;
    private Double trainingProgramsChange;
}