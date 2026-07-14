package com.example.demo.Controllers;

import com.example.demo.DTOs.CreateReportRequestDTO;
import com.example.demo.DTOs.ReportResponseDTO;
import com.example.demo.Services.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping
    public List<ReportResponseDTO> getAll() {
        return reportService.getAll();
    }

    @GetMapping("/inbox/{userId}")
    public List<ReportResponseDTO> getInbox(@PathVariable Long userId) {
        return reportService.getInbox(userId);
    }

    @GetMapping("/sent/{userId}")
    public List<ReportResponseDTO> getSent(@PathVariable Long userId) {
        return reportService.getSentByUser(userId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ReportResponseDTO createReport(@RequestBody CreateReportRequestDTO request) {
        return reportService.createReport(request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteReport(@PathVariable Long id) {
        reportService.deleteReport(id);
    }
}