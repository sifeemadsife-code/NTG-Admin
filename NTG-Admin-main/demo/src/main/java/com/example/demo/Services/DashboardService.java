package com.example.demo.Services;

import com.example.demo.DTOs.DashboardDTO;
import com.example.demo.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final UserRepository userRepository;

    public DashboardDTO getStats() {

        return DashboardDTO.builder()
                .totalStudents(1245)  // ← غير لـ (int) totalStudents
                .totalStudentsChange(12.5)
                .totalEngineers(85)
                .totalEngineersChange(8.9)
                .trainingPrograms(36)
                .trainingProgramsChange(14.2)
                .build();
    }
}
