package com.example.demo.Controllers;

import com.example.demo.DTOs.GradeDTO;
import com.example.demo.repositories.GradeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/grades")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class GradeController {

    private final GradeRepository gradeRepository;

    @GetMapping
    public List<GradeDTO> getAllGrades() {
        return gradeRepository.findAll().stream()
                .map(g -> new GradeDTO(g.getId(), g.getName()))
                .toList();
    }
}