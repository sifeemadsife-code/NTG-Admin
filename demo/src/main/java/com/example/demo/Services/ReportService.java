package com.example.demo.Services;

import com.example.demo.DTOs.CreateReportRequestDTO;
import com.example.demo.DTOs.ReportResponseDTO;
import com.example.demo.entities.Report;
import com.example.demo.entities.User;
import com.example.demo.repositories.ReportRepository;
import com.example.demo.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ReportRepository reportRepository;
    private final UserRepository userRepository;

    public List<ReportResponseDTO> getAll() {
        return reportRepository.findAll().stream().map(this::toResponse).toList();
    }

    public List<ReportResponseDTO> getInbox(Long userId) {
        return reportRepository.findBySentToIdOrderByCreatedAtDesc(userId).stream()
                .map(this::toResponse).toList();
    }

    public List<ReportResponseDTO> getSentByUser(Long userId) {
        return reportRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::toResponse).toList();
    }

    @Transactional
    public ReportResponseDTO createReport(CreateReportRequestDTO request) {
        User sender = userRepository.findById(request.userId())
                .orElseThrow(() -> new RuntimeException("Sender user not found"));
        User sentTo = userRepository.findById(request.sentToId())
                .orElseThrow(() -> new RuntimeException("Recipient user not found"));

        Report report = new Report();
        report.setId(reportRepository.getNextId());
        report.setUser(sender);
        report.setSentTo(sentTo);
        report.setContent(request.content());
        report.setFileLink(request.fileLink());
        report.setCreatedAt(LocalDate.now());

        Report saved = reportRepository.save(report);
        return toResponse(saved);
    }

    @Transactional
    public void deleteReport(Long id) {
        if (!reportRepository.existsById(id)) {
            throw new RuntimeException("Report not found");
        }
        reportRepository.deleteById(id);
    }

    private ReportResponseDTO toResponse(Report r) {
        return new ReportResponseDTO(
                r.getId(),
                r.getUser().getId(),
                r.getUser().getFirstName(),
                r.getUser().getLastName(),
                r.getContent(),
                r.getFileLink(),
                r.getCreatedAt(),
                r.getSentTo().getId(),
                r.getSentTo().getFirstName(),
                r.getSentTo().getLastName()
        );
    }
}